import type {
  SentryCliOptions,
  SentryCliNewDeployOptions,
  SentryCliUploadSourceMapsOptions,
} from '@sentry/cli';

/**
 * Интерфейс объекта конфигурации @sentry/cli
 */
export type SentryConfig = SentryCliOptions & {
  /** Метка релиза */
  release: string,
  /** Настройки деплоя */
  deploy?: SentryCliNewDeployOptions,
  /** Пути, где искать source maps. Поддерживает glob пути */
  sourceMaps?: Omit<SentryCliUploadSourceMapsOptions, 'include'> & {
    include: string[];
  },
};
