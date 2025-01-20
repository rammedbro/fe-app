import { cwd } from 'node:process';
import { getRollupConfig } from '@fe-app/rollup-config';

export default getRollupConfig(cwd(), [
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.js' },
  },
]);
