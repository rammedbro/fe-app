import type * as config from '@/config';
import type * as server from '@/server';
import type { Logger } from '@/logger';

export interface Application {
  config: Config;
  logger: Logger;
}

export interface Config {
  host<T extends keyof config.HostConfig>(path?: T): config.HostConfig[T] | config.HostConfig;

  env(value?: config.Environment): boolean | config.Environment;

  dev(): boolean;

  prod(): boolean;
}

/**
 * Функция обработки конфига перед попаданием на клиент
 */
export type ClientConfig = (config: server.Config) => config.Config;
