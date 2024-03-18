import { Command } from 'commander';
import * as server from '@imolater/fe-app-server';
import { handleConfigsPreActionHook } from '@imolater/fe-app-build/cli';

const program = new Command('server');

program
  .name('server')
  .description('Модуль сервера');

const start = program
  .command('start')
  .description('Запуск сервера в режиме продукта')
  .action(server.start);

const dev = program
  .command('dev')
  .description('Запуск сервера в режиме разработки')
  .option('--fe-app-config <string>', 'Путь до конфигурационного файла fe-app', 'fe-app.config.ts')
  .option('--vite-config <string>', 'Путь до конфигурационного файла vite')
  .option('--client-config <string>', 'Путь до конфигурационного файла клиента')
  .option('--server-config <string>', 'Путь до конфигурационного файла сервера')
  .hook('preAction', handleConfigsPreActionHook)
  .action(server.dev);

export {
  program as default,
  dev,
  start,
};
