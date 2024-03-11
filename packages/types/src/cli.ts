import type { UnimportPluginOptions } from 'unimport/unplugin';
import type { SentryConfig } from '@/sentry';
import type { Environment } from '@/config';

/** Интерфейс объекта опций для указания путей до конфиг файлов */
export interface Configs {
  /** Конфигурационный файл fe-app */
  feAppConfig?: string;
  /** Конфигурационный файл приложения */
  clientConfig?: string;
  /** Конфигурационный файл сервера */
  serverConfig?: string;
  /** Конфигурационный файл vite */
  viteConfig?: string;
}

/**
 * Интерфейс объекта конфигурации fe-app
 */
export interface FEAppConfig {
  /** Уровень логирования **/
  logLevel?: 'error' | 'all',
  /** Пути до конфигурационных файлов */
  configs?: Configs;
  /** Настройка сборки */
  build?: {
    /**
     * Включить в сборку авто импорты.
     * По умолчанию включена только библиотека vue
     */
    useAutoImport?: boolean | Partial<UnimportPluginOptions>;
    /** Включить в сборку воркеры */
    useWorkers?: {
      dedicated: boolean;
    };
    /** Включить поддержку глобальной переменной global */
    useGlobal?: boolean;
    /**
     * Включить поддержку алиасов из tsconfig
     * Не работает для любых файлов стилей. В них следует использовать только алиас "@" для папки "src".
     */
    useTsConfigPaths?: boolean;
    /** Включить в сборку динамический favicon */
    useFavicon?: Record<Environment, string>;
  },
  /** Настройка сервера */
  server?: {
    /** Включить сбор метрик **/
    metrics?: boolean;
    /** Настройки sentry **/
    sentry?: SentryConfig;
  }
}
