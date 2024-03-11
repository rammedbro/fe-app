import type { Config as C, HostConfig, Environment, client } from '@imolater/fe-app-types';

export function getConfig(config: C): client.Config {
  return new Config(config);
}

/**
 * Класс объекта конфига
 */
class Config implements client.Config {
  private readonly _host: HostConfig;

  constructor(config: C) {
    const { host } = config;

    this._host = host;
  }

  /**
   * Обращение к объекту хоста
   *
   * @returns {string | HostConfig}
   */
  host(): HostConfig;
  host<T extends keyof HostConfig>(path?: T): HostConfig[T];
  host<T extends keyof HostConfig>(path?: T): HostConfig[T] | HostConfig {
    return path
      ? this._host[path]
      : this._host;
  }

  /**
   * Получение окружения
   *
   * @returns {boolean | Environment}
   */
  env(): Environment;
  env(value: Environment): boolean;
  env(value?: Environment): boolean | Environment {
    return value
      ? this.host('env') === value
      : this.host('env');
  }

  /**
   * Проверка на dev окружение
   *
   * @returns {boolean}
   */
  dev() {
    return this.env('development');
  }

  /**
   * Проверка на prod окружение
   *
   * @returns {boolean}
   */
  prod() {
    return this.env('production');
  }
}
