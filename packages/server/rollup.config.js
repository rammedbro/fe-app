import { cwd } from 'node:process';
import { getRollupConfig } from '@fe-app/rollup-config';

export default getRollupConfig(cwd(), [
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.js' },
  },
  {
    input: 'src/cli/index.ts',
    output: { file: 'dist/cli.js' },
  },
  {
    input: 'src/cli/bin.ts',
    output: {
      file: 'dist/bin.js',
    },
    options: {
      dts: false,
      shebang: true,
    },
  },
]);
