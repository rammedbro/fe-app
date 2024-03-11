import { generateCommitlint } from '@/modules/commitlint';
import { generateTypelint } from '@/modules/typelint';
import { generateEslint } from '@/modules/eslint';
import { generateStylelint } from '@/modules/stylelint';
import { generateNodelint } from '@/modules/nodelint';

export default {
  commitlint: generateCommitlint,
  typelint: generateTypelint,
  eslint: generateEslint,
  stylelint: generateStylelint,
  nodelint: generateNodelint,
};
