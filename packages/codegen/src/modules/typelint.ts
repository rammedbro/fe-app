import { CodegenFn } from '@/types';

export const generateTypelint: CodegenFn = (generator) => {
  const cmd = 'fe-app-scripts lint-types';

  generator.addLintstagedScript('*.{ts,tsx,vue}', cmd);
  generator.addPackageScript('lint:types', cmd);
};
