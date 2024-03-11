import consola from 'consola';
import type { Logger as LoggerInterface, LoggerEvent, LoggerOptions } from '@imolater/fe-app-types';

export function getLogger(options?: LoggerOptions): Logger {
  const logger = new Logger(options);

  process.on('uncaughtException', err => logger.error({
    name: err.message,
    data: err,
  }));
  process.on('unhandledRejection', (reason) => logger.error({
    name: 'Unhandled rejection',
    data: {
      reason,
    },
  }));

  return logger;
}

class Logger implements LoggerInterface {
  private readonly options: LoggerOptions;

  constructor(options: LoggerOptions = {}) {
    this.options = options;
  }

  send(event: LoggerEvent) {
    // TODO: Реализовать логику серверного логгера
    consola.info({
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
