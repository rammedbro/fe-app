import type { InlineConfig, UserConfig, PluginOption, LibraryOptions, BuildOptions } from 'vite';
import type { Configs, ViteMode } from '@imolater/fe-app-types';

/** Основной vite конфиг */
export type ViteConfig = InlineConfig & {
  mode: ViteMode;
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
};

/** Интерфейс конфига сборки библиотек */
export interface ViteLibConfig extends UserConfig {
  build: ViteLibBuildOptions;
}

export interface ViteLibBuildOptions extends BuildOptions {
  outDir: string;
  lib: LibraryOptions;
}
