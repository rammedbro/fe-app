import type commitlint from '@commitlint/types';
import type { CodegenFn } from '@/types';

export const generateCommitlint: CodegenFn = (generator) => {
  const config: commitlint.UserConfig = {
    extends: ['@commitlint/config-conventional'],
  };
  const filename = 'commitlint.config.js';

  generator.addConfigFile(filename, config);
  generator.addHuskyScript('commit-msg', `pnpm commitlint --edit $1 --config ${ filename }`);
};
