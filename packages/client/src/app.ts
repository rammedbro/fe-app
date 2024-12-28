import { getConfig, type ConfigJson } from '@imolater/fe-app-config';
import { getLogger } from './logger';
import { getBrowserData } from './utils';

declare const __CONFIG__: ConfigJson;

export async function getApplication() {
  const config = getConfig(__CONFIG__);
  const logger = getLogger({ extra: { browser: getBrowserData() } });
  const emitter = new EventTarget();
  const { dedicatedWorker, serviceWorker } = await import('@imolater/fe-app-workers');

  /** Error handlers */
  window.onerror = (message, source, line, col, error) => {
    logger.error({
      name: error?.name || 'Unknown error',
      data: { message, source, line, col },
    });
  };
  window.addEventListener('unhandledrejection', event => {
    logger.error({
      name: 'Unhandled rejection',
      data: { reason: event.reason },
    });
  });

  return {
    config,
    logger,
    emitter,
    workers: {
      dedicated: dedicatedWorker,
      service: serviceWorker,
    },
  };
}
