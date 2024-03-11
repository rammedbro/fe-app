import { URL } from 'node:url';
import { join } from 'node:path';
import { getRollupConfig } from '@fe-app/rollup-config';

const __dirname = new URL('.', import.meta.url).pathname;
const __DEDICATED_WORKER_DIST_PATH__ = 'workers/dedicated-worker.js';

export default getRollupConfig(__dirname, [
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.js' },
  },
  {
    input: 'src/vite-plugin.ts',
    output: [
      { file: 'dist/vite-plugin.js', format: 'es' },
      { file: 'dist/vite-plugin.cjs', format: 'cjs' },
    ],
    options: {
      define: {
        __DEDICATED_WORKER_DIST_PATH__: JSON.stringify(__DEDICATED_WORKER_DIST_PATH__),
      },
      dts: 'dist/vite-plugin.d.ts',
    },
  },
  {
    input: 'src/workers/dedicated-worker.ts',
    output: {
      file: join('dist', __DEDICATED_WORKER_DIST_PATH__),
    },
    options: {
      dts: false,
    },
  },
]);
