import { consola } from 'consola';
import type { LoggerOptions, LoggerEvent } from '@imolater/fe-app-types';

export const getLogger = (options: LoggerOptions = {}) => ({
  send(event: LoggerEvent) {
    // TODO: Реализовать доп логику логгера
    consola.info('Server log:  ' + JSON.stringify({ event, ...options.extra }, null, 2));
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
});
