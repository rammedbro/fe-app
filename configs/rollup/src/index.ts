import fs from 'node:fs';
import path from 'node:path';
import nodeModules from 'node:module';
import { defineConfig, type RollupOptions, type Plugin, type OutputOptions } from 'rollup';
import mergeWith from 'lodash.mergewith';
import typescript from '@rollup/plugin-typescript';
import paths from 'rollup-plugin-tsconfig-paths';
import { dts } from 'rollup-plugin-dts';
import copy, { type CopyOptions } from 'rollup-plugin-copy';
import cleanup from 'rollup-plugin-cleanup';
import del from 'rollup-plugin-delete';
import replace, { type RollupReplaceOptions } from '@rollup/plugin-replace';
import type { PackageJson } from 'type-fest';

interface RollupConfig extends RollupOptions {
  input: string;
  output: Omit<OutputOptions, 'dir'>;
  plugins?: Plugin[];
  options?: {
    external?: boolean;
    dts?: boolean | string,
    copy?: CopyOptions,
    define?: RollupReplaceOptions,
  };
}

export function getRollupConfig(root: string, configs: RollupConfig[]) {
  const pkgPath = path.resolve(root, 'package.json');
  const pkg: PackageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const baseConfig: Partial<RollupConfig> = {
    context: root,
    output: {
      format: 'esm',
    },
    external: [],
    plugins: [
      typescript({ rootDir: root }),
      paths(),
      cleanup({
        comments: 'none',
        extensions: ['js', 'ts'],
      }),
      del({
        targets: 'dist/*',
        runOnce: true,
      }),
    ],
  };
  const result: RollupConfig[] = [];
  const mergeWithArray = (obj: object, ...src: object[]) =>
    mergeWith(obj, ...src, (obj: object, src: object) => {
      if (Array.isArray(obj)) return obj.concat(src);
    });

  for (const config of configs) {
    const mergedConfig: RollupConfig = mergeWithArray({}, baseConfig, config);

    delete mergedConfig.options;
    result.push(mergedConfig);

    if (config.options?.dts !== false) {
      const typesConfig = mergeWithArray({}, mergedConfig, { plugins: [dts()] } as RollupConfig);
      typesConfig.output = {
        file: (typeof config.options?.dts === 'string')
          ? config.options.dts
          : typesConfig.output.file.slice(0, typesConfig.output.file.lastIndexOf('.')) + '.d.ts',
      };
      result.push(typesConfig);
    }

    if (config.options?.external !== false) {
      mergedConfig.external = [
        // Исключаем из бандла любые зависимости prod, peer, builtin
        pkg.name,
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        ...nodeModules.builtinModules,
        ...nodeModules.builtinModules.map(module => `node:${ module }`),
      ].map(dependency => new RegExp(`^(${dependency}$|${dependency}/)`));
    }

    if (config.options?.copy) {
      mergedConfig.plugins!.push(copy(config.options.copy));
    }

    if (config.options?.define) {
      mergedConfig.plugins!.push(replace({
        preventAssignment: true,
        ...config.options.define,
      }));
    }
  }

  return defineConfig(result);
}
