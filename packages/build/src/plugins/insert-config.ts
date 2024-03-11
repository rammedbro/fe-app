import type { Plugin } from 'vite';
import type { Config } from '@imolater/fe-app-types';

/**
 * Плагин для vite, добавляющий app.config в начало html документа
 *
 * @returns {Plugin}
 */
export function insertConfig(config: Config): Plugin {
  return {
    name: 'fe-app-insert-config-plugin',
    transformIndexHtml: {
      // order: 'pre',
      handler(html) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              injectTo: 'head-prepend',
              children: `window.___config = ${ JSON.stringify(config) }`,
            },
          ],
        };
      },
    },
    // TODO: Реализовать hmr для app.config при разработке
    // handleHotUpdate: ({ file, server }) => {
    //   if (file.includes('app.config')) {
    //     const config = loadModule<AppConfigFn>(file);
    //
    //     server.ws.send({
    //       type: 'custom',
    //       event: 'app-config-update',
    //       data: config(),
    //     });
    //
    //     return [];
    //   }
    // },
  };
}
