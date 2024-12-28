import path from 'node:path';
import process from 'node:process';
import { loadConfigFromFile, mergeConfig, createLogger } from 'vite';
import mime from 'mime-types';
import lodashMerge from 'lodash.merge';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { installWorkers } from '@imolater/fe-app-workers/vite-plugin';
import type { InlineConfig, LibraryOptions, PluginOption, UserConfig, BuildOptions, Logger } from 'vite';
import type { UnimportPluginOptions } from 'unimport/unplugin';
import type { FEAppConfig, Configs } from '@imolater/fe-app-types';
import {
  generateBuildMeta,
  generateManifest,
  insertConfig,
  insertFavicon,
  insertGlobalVariable,
  handlePublicDir,
} from '@/plugins';
import { loadModule, mapObjectValues } from '@/utils';
import type { Config, ConfigJson } from '@imolater/fe-app-config';

/** В каком режиме запущен vite - сборщик/сервер */
export type ViteMode = 'production' | 'development';

/** Основной vite конфиг */
export type ViteConfig = InlineConfig & {
  mode: ViteMode;
  publicDir: string;
  build: {
    outDir: string;
    assetsDir: string;
    /** Дополнительные конфиги для сборки в рамках одного конфига */
    libConfigs: ViteLibConfig[];
    /** Метаданные сборки */
    meta: {
      /** Пути до собираемых конфигов после сборки */
      configs: Configs;
    };
  };
  plugins: PluginOption[];
  resolve: {
    alias: Record<string, string>;
  };
  customLogger: Logger;
};

/** Интерфейс конфига сборки библиотек */
interface ViteLibConfig extends UserConfig {
  build: ViteLibBuildOptions;
}

interface ViteLibBuildOptions extends BuildOptions {
  lib: LibraryOptions;
}

/**
 * Получение vite конфига
 *
 * @param {ViteMode} mode - режим работы vite
 * @param config
 * @param {Configs} configs - опции для указания путей до конфиг файлов
 * @returns {Promise<ViteConfig>}
 */
export async function getViteConfig(
  mode: ViteMode,
  config: Config,
  configs: Configs = {},
): Promise<ViteConfig> {
  const cwd = process.cwd();
  const isProduction = mode === 'production';
  const outDir = 'build';
  const publicDir = 'public';
  const assetsDir = 'assets';
  const assetPath = (filename: string, type?: string) =>
    `${ assetsDir }/${ type || mime.lookup(path.extname(filename)) }/${ filename }`;
  const assets = {
    buildMeta: assetPath('build.json'),
    manifest: assetPath('manifest.json'),
    dedicatedWorker: assetPath('dedicated-worker.js'),
    serviceWorker: assetPath('service-worker.js'),
  };
  const viteLibBuildOptions: BuildOptions = {
    outDir: outDir,
    emptyOutDir: false,
    sourcemap: false,
    manifest: false,
    copyPublicDir: false,
  };
  let viteConfig: ViteConfig = {
    configFile: false,
    mode,
    publicDir,
    build: {
      outDir,
      assetsDir,
      manifest: false,
      sourcemap: 'hidden',
      copyPublicDir: false,
      emptyOutDir: false,
      rollupOptions: {
        output: {
          dir: outDir,
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) {
              throw new Error(`Invalid asset name: ${ assetInfo.source }`);
            }

            const type = mime.lookup(assetInfo.name);

            return type
              ? assetPath('[hash:12].[ext]', type)
              : assetInfo.name;
          },
          entryFileNames: assetPath('[hash:12].js'),
          chunkFileNames: assetPath('[hash:12].js'),
        },
      },
      libConfigs: [],
      meta: {
        configs: {
          feAppConfig: path.join(outDir, 'fe-app.config.cjs'),
          clientConfig: path.join(outDir, 'client.config.cjs'),
        },
      },
    },
    server: {
      middlewareMode: true,
    },
    plugins: [
      handlePublicDir({ outDir, publicDir }),
      generateBuildMeta({ path: assets.buildMeta }),
      isProduction && generateManifest({ path: assets.manifest }),
    ],
    resolve: {
      alias: {},
    },
    customLogger: createLogger(),
  };

  if (configs.feAppConfig) {
    if (isProduction) {
      viteConfig.build.libConfigs.push({
        build: {
          ...viteLibBuildOptions,
          lib: {
            entry: configs.feAppConfig,
            fileName: () => path.relative(outDir, viteConfig.build.meta.configs.feAppConfig!),
            formats: ['cjs'],
          } as LibraryOptions,
        },
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
      viteConfig.plugins.push(
        installWorkers({ dedicated: assets.dedicatedWorker }),
      );
    }

    if (feAppConfig.build?.useWorkers?.service) {
      viteConfig.plugins.push(
        installWorkers({ service: assets.serviceWorker }),
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
        build: {
          ...viteLibBuildOptions,
          lib: {
            entry: configs.clientConfig,
            fileName: () => path.relative(outDir, viteConfig.build.meta.configs.clientConfig!),
            formats: ['cjs'],
          } as LibraryOptions,
        },
      });
    } else {
      const clientConfig = loadModule<(config: Config) => ConfigJson>(configs.clientConfig, { compile: true });
      viteConfig.plugins.push(insertConfig(clientConfig(config)));
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
      throw new Error(`Could not load vite config file from ${ configs.viteConfig }`);
    }

    viteConfig = mergeConfig(configFromFile.config, viteConfig) as ViteConfig;
  }

  return viteConfig;
}
