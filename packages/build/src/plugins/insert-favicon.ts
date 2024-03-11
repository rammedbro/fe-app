import fs from 'node:fs';
import type { Plugin } from 'vite';
import type { EmittedAsset } from 'rollup';
import type { Environment } from '@imolater/fe-app-types';
import { mapObjectValues } from '@/utils';

type Options = Record<Environment, { src: string; dist: string; }>;

/**
 * Плагин для vite, добавляющий favicon в зависимости от окружения
 *
 * @returns {Plugin}
 */
export function insertFavicon(options: Options): Plugin {
  const faviconHtmlId = 'favicon';
  const favicons = mapObjectValues(options, ({ src, dist }) => ({
    type: 'asset',
    fileName: dist,
    source: fs.readFileSync(src),
  } as EmittedAsset));

  return {
    name: 'fe-app-insert-favicon',
    buildEnd() {
      Object.values(favicons).forEach(this.emitFile);
    },
    configureServer({ middlewares }) {
      Object.values(favicons).forEach(favicon => {
        middlewares.use(`/${ favicon.fileName }`, (_, res) => {
          return res.end(favicon.source);
        });
      });
    },
    transformIndexHtml: {
      handler(html) {
        return {
          html,
          tags: [
            {
              injectTo: 'head',
              tag: 'link',
              attrs: {
                id: faviconHtmlId,
                rel: 'shortcut icon',
                type: 'image/x-icon',
              },
            },
            {
              injectTo: 'head',
              tag: 'script',
              children:
                `var favicon = document.getElementById('${ faviconHtmlId }');\n` +
                Object.entries(favicons)
                  .map(([env, favicon]) =>
                    `if ((window.___config.host.env === '${ env }')) { favicon.href = '/${ favicon.fileName }'; }`)
                  .join('\n')
              ,
            },
          ],
        };
      },
    },
  };
}
