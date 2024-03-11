/// <reference lib="dom"/>

import type { Logger as LoggerInterface, LoggerOptions, LoggerEvent } from '@imolater/fe-app-types';
import { RequestError } from '@/errors';

/**
 * Получение клиентского логгера
 *
 * @param {AppConfig} config - конфиг файл приложения из объекта window
 * @param {SloggerProxyOptions} options - опции am-slogger
 * @returns {Logger}
 */
export function getLogger(options: LoggerOptions = {}): Logger {
  const logger = new Logger({
    extra: {
      ...options.extra,
      browser: getBrowserData(),
    },
  });

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

  return logger;
}

function getBrowserData() {
  const ua = navigator.userAgent;
  let browserName: string;

  if (ua.search(/Edge/) !== -1) {
    browserName = 'edge';
  } else if (ua.search(/MSIE/) !== -1) {
    browserName = 'ie';
  } else if (ua.search(/Trident/) !== -1) {
    browserName = 'ie11';
  } else if (ua.search(/Firefox/) !== -1) {
    browserName = 'firefox';
  } else if (ua.search(/Opera/) !== -1) {
    browserName = 'opera';
  } else if (ua.search(/OPR/) !== -1) {
    browserName = 'operaWebkit';
  } else if (ua.search(/YaBrowser/) !== -1) {
    browserName = 'yabrowser';
  } else if (ua.search(/Chrome/) !== -1) {
    browserName = 'chrome';
  } else if (ua.search(/Safari/) !== -1) {
    browserName = 'safari';
  } else if (ua.search(/Maxthon/) !== -1) {
    browserName = 'maxthon';
  } else {
    browserName = 'unknown';
  }

  let version: string;

  switch (browserName) {
    case 'edge':
      version = ua.split('Edge')[1].split('/')[1];
      break;
    case 'ie':
      version = ua.split('MSIE ')[1].split(';')[0];
      break;
    case 'ie11':
      browserName = 'ie';
      version = ua.split('; rv:')[1].split(')')[0];
      break;
    case 'firefox':
      version = ua.split('Firefox/')[1];
      break;
    case 'opera':
      version = ua.split('Version/')[1];
      break;
    case 'operaWebkit':
      browserName = 'opera';
      version = ua.split('OPR/')[1];
      break;
    case 'yabrowser':
      version = ua.split('YaBrowser/')[1].split(' ')[0];
      break;
    case 'chrome':
      version = ua.split('Chrome/')[1].split(' ')[0];
      break;
    case 'safari':
      version = ua.split('Version/')[1].split(' ')[0];
      break;
    case 'maxthon':
      version = ua.split('Maxthon/')[1];
      break;
    default:
      version = 'unknown';
  }

  let platform: string;

  if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua.toLowerCase())) {
    platform = 'mobile';
  } else {
    platform = 'desktop';
  }

  return {
    platform,
    browser: browserName,
    versionFull: version,
    versionShort: (version !== 'unknown')
      ? version.split('.')[0]
      : 'unknown',
  };
}

class Logger implements LoggerInterface {
  private readonly options: LoggerOptions;

  constructor(options: LoggerOptions = {}) {
    this.options = options;
  }

  send(event: LoggerEvent) {
    // TODO: Реализовать логику клиентского логгера
    // eslint-disable-next-line no-console
    console.log('Client log:  ' + {
      event,
      ...this.options.extra,
    });
  }

  info({ name, data }: LoggerEvent) {
    return this.send({ name, data, type: 'info' });
  }

  warn({ name, data }: LoggerEvent) {
    return this.send({ name, data, type: 'warn' });
  }

  error({ name, data }: LoggerEvent) {
    return this.send({ name, data, type: 'error' });
  }
}
