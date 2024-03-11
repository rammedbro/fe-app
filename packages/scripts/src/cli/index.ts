import { Command } from 'commander';
import { lintTypes, validateNodeVersion } from '@imolater/fe-app-scripts';
import { parseArgsAndOptsForAction } from './utils';

const program = new Command('scripts');

program
  .name('scripts')
  .description('Модуль вспомогательных скриптов');

program
  .command('lint-types')
  .allowUnknownOption(true)
  .description('Проверка типов проекта. Можно передать опции vue-tsc')
  .argument(
    '[files...]',
    'Проверяемые файлы, указанные через пробел. Если оставить пустым ' +
      'будут проверены все файлы проекта, указанные в tsconfig.json.'
  )
  .action(parseArgsAndOptsForAction(lintTypes));

program
  .command('validate-node-version')
  .description('Проверка используемой версии проекта')
  .action(validateNodeVersion);

export default program;
