import type * as stylelint from 'stylelint';
import { CodegenFn } from '@/types';

export const generateStylelint: CodegenFn = (generator) => {
  const config: stylelint.Config = {
    extends: [
      'stylelint-config-recommended',
    ],
  };
  const pattern = '*.{css,scss}';

  generator.addConfigFile('.stylelintrc.js', config);
  generator.addPackageScript('lint:css', `stylelint "**/${ pattern }"`);
  generator.addLintstagedScript(pattern, 'stylelint --fix');
};
