import type { CodegenFn } from '@/types';

export const generateNodelint: CodegenFn = (generator) => {
  const cmd = 'fe-app-scripts validate-node-version';

  generator.addHuskyScript('pre-commit', cmd);
  generator.addPackageScript('lint:node', cmd);
};
