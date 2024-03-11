import type { Config, Logger, client } from '@imolater/fe-app-types';
import { getConfig } from '@/config';
import { getLogger } from '@/logger';

export function getApplication(): client.Application {
  return new Application();
}

class Application implements client.Application {
  public config: client.Config;
  public logger: Logger;

  constructor() {
    // @ts-ignore
    this.config = getConfig(window.___config as Config); // TODO: Заменить на получение конфига через ассеты
    this.logger = getLogger();
  }
}
