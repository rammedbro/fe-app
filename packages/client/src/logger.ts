import type { LoggerOptions, LoggerEvent } from '@imolater/fe-app-types';

export function getLogger(options: LoggerOptions = {}) {
  return {
    send(event: LoggerEvent) {
      // TODO: Реализовать логику клиентского логгера
      window.console.log(`Client log: ${ JSON.stringify({ event, ...options.extra }, null, 2) }`);
    },
    info({ name, data }: LoggerEvent) {
      return this.send({ name, data, type: 'info' });
    },
    warn({ name, data }: LoggerEvent) {
      return this.send({ name, data, type: 'warn' });
    },
    error({ name, data }: LoggerEvent) {
      return this.send({ name, data, type: 'error' });
    },
  };
}
