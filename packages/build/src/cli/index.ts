import { Command } from 'commander';
import { build } from '@imolater/fe-app-build';
import { handleConfigsPreActionHook } from '@/cli/utils';

const program = new Command('build');

program
  .name('build')
  .description('Сборка проекта')
  .option('--fe-app-config <string>', 'Путь до конфигурационного файла fe-app', 'fe-app.config.ts')
  .option('--vite-config <string>', 'Путь до конфигурационного файла vite')
  .hook('preAction', handleConfigsPreActionHook)
  .action(build);

export {
  program as default,
  handleConfigsPreActionHook,
};
