import type { Linter } from 'eslint';
import type { CodegenFn } from '@/types';

export const generateEslint: CodegenFn = (generator) => {
  const config: Linter.Config = {
    extends: [
      'eslint:recommended',
    ],
    ignorePatterns: [
      'node_modules',
      'build',
    ],
  };
  const pattern = '*.{js,jsx,ts,tsx,vue}';

  generator.addConfigFile('.eslintrc.js', config);
  generator.addPackageScript('lint:js', `eslint "**/${ pattern }"`);
  generator.addLintstagedScript(pattern, 'eslint --fix');
};
