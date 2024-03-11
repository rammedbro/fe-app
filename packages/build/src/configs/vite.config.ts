import path from 'node:path';
import process from 'node:process';
import { loadConfigFromFile, mergeConfig, type LibraryOptions } from 'vite';
import mime from 'mime-types';
import lodashMerge from 'lodash.merge';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { UnimportPluginOptions } from 'unimport/unplugin';
import type { FEAppConfig, ViteMode, Configs, client } from '@imolater/fe-app-types';
import { generateBuildMeta, generateManifest, insertConfig, insertFavicon, insertGlobalVariable } from '@/plugins';
import { loadModule, getConfig, mapObjectValues, deepmerge } from '@/utils';
import type { ViteConfig } from '@/types';

/**
 * Получение vite конфига
 *
 * @param {ViteMode} mode - режим работы vite
 * @param {Configs} configs - опции для указания путей до конфиг файлов
 * @returns {Promise<ViteConfig>}
 */
export async function getViteConfig(
  mode: ViteMode,
  configs: Configs = {},
): Promise<ViteConfig> {
  const cwd = process.cwd();
  const isProduction = mode === 'production';
  const outDir = 'build';
  const assetsDir = 'assets';
  const assetPath = (filename: string, type?: string) =>
    `${ assetsDir }/${ type || mime.lookup(path.extname(filename)) }/${ filename }`;
  const assets = {
    buildMeta: assetPath('build.json'),
    manifest: assetPath('manifest.json'),
    worker: assetPath('worker.js'),
  };
  const viteLibBuildOptions = {
    outDir: cwd,
    emptyOutDir: false,
    sourcemap: false,
    manifest: false,
  };
  let viteConfig: ViteConfig = {
    configFile: false,
    mode,
    build: {
      outDir,
      assetsDir,
      manifest: false,
      sourcemap: 'hidden',
      copyPublicDir: true,
      rollupOptions: {
        output: {
          dir: outDir,
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) {
              throw new Error(`Некорректное имя ассета: ${ assetInfo.source }`);
            }

            const type = mime.lookup(assetInfo.name);

            if (!type) {
              return assetInfo.name;
            }

            return assetPath('[hash:12].[ext]', type);
          },
          entryFileNames: assetPath('[hash:12].js'),
          chunkFileNames: assetPath('[hash:12].js'),
        },
      },
      libConfigs: [],
      meta: {
        configs: {
          feAppConfig: path.join(outDir, 'fe-app.config.js'),
          clientConfig: path.join(outDir, 'client.config.js'),
        },
      },
    },
    server: {
      middlewareMode: true,
    },
    plugins: [
      generateBuildMeta({ path: assets.buildMeta }),
      isProduction && generateManifest({ path: assets.manifest }),
    ],
    resolve: {
      alias: {},
    },
  };

  if (configs.feAppConfig) {
    if (isProduction) {
      viteConfig.build.libConfigs.push({
        build: deepmerge({}, viteLibBuildOptions, {
          lib: {
            entry: configs.feAppConfig,
            fileName: () => viteConfig.build.meta.configs.feAppConfig,
            formats: ['cjs'],
          } as LibraryOptions,
        }),
      });
    }

    const feAppConfig = loadModule<FEAppConfig>(configs.feAppConfig, { compile: true });

    const useAutoImport = feAppConfig.build?.useAutoImport;
    if (useAutoImport) {
      const config: Partial<UnimportPluginOptions> = {
        presets: [
          'vue',
        ],
        addons: {
          vueTemplate: true,
        },
        dts: 'src/auto-imports.d.ts',
      };

      if (typeof useAutoImport === 'object') {
        lodashMerge(config, useAutoImport);
      }

      const { default: UnImport } = await import('unimport/unplugin');
      viteConfig.plugins.push(UnImport.vite(config));
    }

    if (feAppConfig.server?.sentry && isProduction) {
      const { release } = feAppConfig.server.sentry;

      viteConfig.build.sourcemap = true;
      viteConfig.plugins.push(
        sentryVitePlugin({
          release: {
            name: release,
            inject: true,
          },
          silent: feAppConfig.logLevel !== 'all',
        }),
      );
    }

    if (feAppConfig.build?.useWorkers?.dedicated) {
      const { installDedicatedWorker } = await import('@imolater/fe-app-workers/vite-plugin');

      viteConfig.plugins.push(
        installDedicatedWorker({
          workerAssetPath: assets.worker,
          buildMetaAssetPath: assets.buildMeta,
        }),
      );
    }

    if (feAppConfig.build?.useGlobal) {
      viteConfig.plugins.push(insertGlobalVariable());
    }

    if (feAppConfig.build?.useTsConfigPaths) {
      viteConfig.plugins.push(tsconfigPaths());
      viteConfig.resolve.alias['@'] = path.resolve(cwd, 'src');
    }

    if (feAppConfig.build?.useFavicon) {
      viteConfig.plugins.push(insertFavicon(mapObjectValues(
        feAppConfig.build.useFavicon,
        src => ({ src, dist: assetPath(path.basename(src)) }),
      )));
    }
  }

  if (configs.clientConfig) {
    if (isProduction) {
      viteConfig.build.libConfigs.push({
        build: deepmerge({}, viteLibBuildOptions, {
          lib: {
            entry: configs.clientConfig,
            fileName: () => viteConfig.build.meta.configs.clientConfig,
            formats: ['cjs'],
          } as LibraryOptions,
        }),
      });
    } else {
      const clientConfig = loadModule<client.ClientConfig>(configs.clientConfig, { compile: true });
      viteConfig.plugins.push(insertConfig(clientConfig(getConfig())));
    }
  }

  if (configs.viteConfig) {
    const configFromFile = await loadConfigFromFile(
      {
        mode,
        command: 'build',
      },
      configs.viteConfig,
    );

    if (configFromFile === null) {
      throw new Error('Не удалось загрузить локальный конфиг');
    }

    viteConfig = mergeConfig(configFromFile.config, viteConfig) as ViteConfig;
  }

  return viteConfig;
}
