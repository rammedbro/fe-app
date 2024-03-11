import type { Plugin } from 'vite';
import type { ViteConfig } from '@/types';

/**
 * Плагин для vite, генерирующий manifest.json
 * @param {{path: string}} options
 * @returns {Plugin}
 */
export function generateManifest(options: {
  path: string,
}): Plugin {
  return {
    name: 'fe-app-generate-manifest',
    config(config) {
      (config as ViteConfig).build.manifest = options.path;
    },
    transformIndexHtml: {
      transform(html) {
        return {
          html,
          tags: [
            {
              injectTo: 'head',
              tag: 'link',
              attrs: {
                id: 'manifest',
                rel: 'manifest',
                href: `/${ options.path }`,
              },
            },
          ],
        };
      },
    },
  };
}
