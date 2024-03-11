import { createServer } from 'vite';
import type { ViteDevServer } from 'vite';
import type { Configs } from '@imolater/fe-app-types';
import { getViteConfig } from '@/configs/vite.config';

/**
 * Сборка dev сервера vite
 *
 * @param {Configs} configs - опции для указания путей до конфиг файлов
 * @returns {Promise<ViteDevServer>}
 */
export async function createDevServer(configs: Configs = {}): Promise<ViteDevServer> {
  const viteConfig = await getViteConfig('development', configs);

  return createServer(viteConfig);
}
