import type { Environment, server } from '@imolater/fe-app-types';

/**
 * Получение конфига am-config
 *
 * @param {string} cwd - рабочая директория. По-умолчанию process.cwd()
 * @returns {AmConfig}
 */
export function getConfig(): server.Config {
  const env: Environment = 'production';

  return {
    host: {
      name: 'app.example',
      env,
      port: 3000,
    },
    inspector: {
      enable: false,
      port: 3010,
    },

    prod() {
      return env === 'production';
    },
    dev() {
      return false;
    },
    docker() {
      return false;
    },
  };
}
