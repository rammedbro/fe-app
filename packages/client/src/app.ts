import { getConfig, type ConfigJson } from '@imolater/fe-app-config';
import { getLogger } from './logger';
import { getApi } from './api';
import { RequestError } from './errors';
import { getBrowserData } from './utils';

declare const __CONFIG__: ConfigJson;

export async function getApplication() {
  const config = getConfig(__CONFIG__);
  const logger = getLogger({ extra: { browser: getBrowserData() } });
  const api = getApi(config.get('api.url'));
  const emitter = new EventTarget();
  const { dedicatedWorker, serviceWorker } = await import('@imolater/fe-app-workers');

  /** Error handlers */
  window.onerror = (message, source, line, col, error) => {
    if (error instanceof RequestError) {
      logger.error({
        name: 'Request error',
        data: {
          ...error,
          stack: error.stack,
          message: error.message,
        },
      });

      return;
    }

    const data = {
      message,
      line,
      col,
      error: error && error.stack,
    };
    const isErrorEmpty =
      message === 'Script error.' &&
      line === 0 &&
      col === 0;

    if (isErrorEmpty) {
      logger.warn({
        name: 'Third party script error',
        data,
      });
    } else {
      logger.error({
        name: 'JS Uncaught Error',
        data,
      });
    }
  };
  window.addEventListener('unhandledrejection', event => {
    const message = 'Unhandled rejection';

    if (event.reason instanceof Error) {
      window.onerror!(
        message,
        undefined,
        undefined,
        undefined,
        event.reason,
      );
    } else {
      logger.error({
        name: message,
        data: {
          reason: event.reason,
        },
      });
    }
  });

  return {
    config,
    logger,
    api,
    emitter,
    workers: {
      dedicated: dedicatedWorker,
      service: serviceWorker,
    },
  };
}
