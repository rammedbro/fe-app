import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import type { Plugin } from 'vite';

declare const __DEDICATED_WORKER_DIST_PATH__: string;

export function installDedicatedWorker(options: {
  workerAssetPath: string,
  buildMetaAssetPath: string
}): Plugin {
  const { workerAssetPath, buildMetaAssetPath } = options;
  const assetContent = fs
    .readFileSync(
      path.join(path.dirname(url.fileURLToPath(import.meta.url)), __DEDICATED_WORKER_DIST_PATH__),
      { encoding: 'utf-8' },
    )
    .replace('__BUILD_META_PATH__', JSON.stringify(`/${ buildMetaAssetPath }`));

  return {
    name: 'fe-app-install-dedicated-worker',
    config: (config) => {
      config.define = Object.assign(config.define || {}, {
        __DEDICATED_WORKER_ASSET_PATH__: JSON.stringify(`/${ workerAssetPath }`),
      });
    },
    configureServer({ middlewares }) {
      middlewares.use(`/${ workerAssetPath }`, (_, res) => {
        return res.end(assetContent);
      });
    },
    buildEnd() {
      this.emitFile({
        type: 'asset',
        fileName: workerAssetPath,
        source: assetContent,
      });
    },
  };
}
