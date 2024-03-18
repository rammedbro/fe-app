import { readFileSync } from 'node:fs';
import { build as viteBuild } from 'vite';
import consola from 'consola';
import { getConfig } from '@imolater/fe-app-config';
import type { Configs } from '@imolater/fe-app-types';
import { getViteConfig } from './vite';

/**
 * Сборка проекта в режиме production
 *
 * @param {Configs} configs - Опции для указания путей до конфиг файлов
 * @returns {Promise<void>}
 */
export async function build(configs: Configs = {}): Promise<void> {
  const viteConfig = await getViteConfig(
    'production',
    getConfig(JSON.parse(readFileSync('config.json', 'utf-8'))),
    configs,
  );

  await viteBuild(viteConfig);

  if (viteConfig.build.libConfigs.length) {
    consola.info('Сборка дополнительных библиотек...');

    for (const config of viteConfig.build.libConfigs) {
      await viteBuild(config);
    }
  }
}
