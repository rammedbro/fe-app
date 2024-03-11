import { Command } from 'commander';
import { runServer, runDevServer } from '@imolater/fe-app-server';
import { handleConfigsPreActionHook } from '@imolater/fe-app-build/cli';

const program = new Command('server');

program
  .name('server')
  .description('Модуль сервера');

const dev = program
  .command('dev')
  .description('Запуск сервера в режиме разработки')
  .option('--fe-app-config <string>', 'Путь до конфигурационного файла fe-app', 'fe-app.config.ts')
  .option('--vite-config <string>', 'Путь до конфигурационного файла vite')
  .option('--client-config <string>', 'Путь до конфигурационного файла клиента')
  .option('--server-config <string>', 'Путь до конфигурационного файла сервера')
  .hook('preAction', handleConfigsPreActionHook)
  .action(runDevServer);

const start = program
  .command('start')
  .description('Запуск сервера в режиме продукта')
  .action(runServer);

export {
  program as default,
  dev,
  start,
};
