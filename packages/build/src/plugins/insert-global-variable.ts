import type { Plugin } from 'vite';

/**
 * Плагин для vite, добавляющий поддержку глобальной переменной global
 *
 * @returns {Plugin}
 */
export function insertGlobalVariable(): Plugin {
  return {
    name: 'fe-app-insert-global-variable',
    transformIndexHtml: {
      transform(html) {
        return {
          html,
          tags: [
            {
              injectTo: 'head',
              tag: 'script',
              children: 'var global = global || window',
            },
          ],
        };
      },
    },
  };
}
