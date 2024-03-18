import lodashGet from 'lodash.get';

type Environment = 'production' | 'development';

export interface ConfigJson {
  host: {
    env: Environment;
    port: number;
  };
  api: {
    url: string;
  },
  inspector: {
    enable: boolean;
    port: number;
  };
  deployer: {
    type: string;
  }
}

export type Config = ReturnType<typeof getConfig>;

export function getConfig(config: ConfigJson) {
  function get(key?: string) {
    return key
      ? lodashGet(config, key)
      : JSON.parse(JSON.stringify(config));
  }

  function env(value?: Environment): boolean | Environment {
    return value
      ? config.host.env === value
      : config.host.env;
  }

  return {
    get,
    env,
    prod() {
      return config.host.env === 'production';
    },
    dev() {
      return config.host.env === 'development';
    },
    docker() {
      return config.deployer.type === 'docker';
    },
  };
}
