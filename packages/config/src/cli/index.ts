import { readFileSync } from 'node:fs';
import { Command } from 'commander';
import { consola } from 'consola';

const program = new Command('scripts');

program
  .name('config')
  .description('Модуль обработки конфига');

program
  .command('show')
  .description('Вывести в консоль текущий конфиг')
  .option('--path <string>', 'Путь до конфиг файла приложения', 'config.json')
  .action((options) => {
    const config = JSON.parse(readFileSync(options.path, 'utf-8'));

    consola.info(config);
  });

export default program;
