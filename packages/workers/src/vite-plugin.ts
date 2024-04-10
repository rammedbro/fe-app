import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';

declare const __DEDICATED_WORKER_DIST_PATH__: string;
declare const __SERVICE_WORKER_DIST_PATH__: string;

export function installWorkers(
  options: {
    dedicated?: string,
    service?: string,
  } = {},
): Plugin {
  const assets = {
    dedicated: __DEDICATED_WORKER_DIST_PATH__,
    service: __SERVICE_WORKER_DIST_PATH__,
  };
  const asset = (name: keyof typeof assets) =>  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), assets[name]),
    'utf-8',
  );

  return {
    name: 'fe-app-install-workers',
    config: (config) => {
      config.define = Object.assign(config.define || {}, {
        __DEDICATED_WORKER_ASSET_PATH__: JSON.stringify(`/${ options.dedicated }`),
        __SERVICE_WORKER_ASSET_PATH__: JSON.stringify(`/${ options.service }`),
      });
    },
    configureServer({ middlewares }) {
      Object.entries(options).forEach(worker => {
        const [name, path] = worker;

        middlewares.use(`/${ path }`, (_, res) => {
          return res.end(asset(name as keyof typeof assets));
        });
      });
    },
    buildEnd() {
      Object.entries(options).forEach(worker => {
        const [name, path] = worker;

        this.emitFile({
          type: 'asset',
          fileName: path,
          source: asset(name as keyof typeof assets),
        });
      });
    },
  };
}
