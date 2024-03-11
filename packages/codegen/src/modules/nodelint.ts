import type { CodegenFn } from '@/types';

export const generateNodelint: CodegenFn = (generator) => {
  generator.addHuskyScript('pre-commit', 'fe-app-scripts validate-node-version');
};
