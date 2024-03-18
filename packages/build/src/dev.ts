import { readFileSync } from 'node:fs';
import { createServer } from 'vite';
import { getConfig } from '@imolater/fe-app-config';
import type { ViteDevServer } from 'vite';
import type { Configs } from '@imolater/fe-app-types';
import { getViteConfig } from './vite';

/**
 * Сборка dev сервера vite
 *
 * @param {Configs} configs - опции для указания путей до конфиг файлов
 * @returns {Promise<ViteDevServer>}
 */
export async function createDevServer(configs: Configs = {}): Promise<ViteDevServer> {
  const viteConfig = await getViteConfig(
    'development',
    getConfig(JSON.parse(readFileSync('config.json', 'utf-8'))),
    configs,
  );

  return createServer(viteConfig);
}
