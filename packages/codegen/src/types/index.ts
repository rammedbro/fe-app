import type { CodeGenerator } from '@/generator';

export interface CodegenFnOptions {
  cwd?: string;
}

export type CodegenFn = (generator: CodeGenerator, options?: CodegenFnOptions) => void;
