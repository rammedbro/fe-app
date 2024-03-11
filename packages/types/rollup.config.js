import { URL } from 'node:url';
import { getRollupConfig } from '@fe-app/rollup-config';

const __dirname = new URL('.', import.meta.url).pathname;

export default getRollupConfig(__dirname, [
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.js' },
  },
]);