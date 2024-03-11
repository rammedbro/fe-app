import type { Plugin } from 'vite';

/**
 * Плагин для vite, генерирующий файл с метаданными сборки приложения
 * @param {{path: string}} options
 * @returns {Plugin}
 */
export function generateBuildMeta(options: {
  path: string,
}): Plugin {
  const meta = JSON.stringify({
    version: new Date().getTime(),
  });

  return {
    name: 'fe-app-generate-build-meta',
    configureServer({ middlewares }) {
      middlewares.use(`/${ options.path }`, (_, res) => {
        return res.end(meta);
      });
    },
    buildEnd() {
      this.emitFile({
        type: 'asset',
        fileName: options.path,
        source: meta,
      });
    },
  };
}
