import { Command } from 'commander';
import inquirer from 'inquirer';
import { initProject } from '@imolater/fe-app-codegen';

const program = new Command('codegen');

program
  .name('codegen')
  .description('Модуль кодогенерации');

program
  .command('init-project')
  .description('Первоначальная настройка проекта. Генерируются файлы husky, eslint, stylelint и тд')
  .action(async () => {
    const result = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Выберите модули, которые требуется установить',
        choices: [ 'commitlint', 'typelint', 'eslint', 'stylelint', 'nodelint' ],
      },
      {
        type: 'confirm',
        name: 'confirmed',
        message: 'В процессе генерации, уже имеющиеся файлы проекта, будут перезаписаны. ' +
          'Вы точно уверены, что хотите продолжить?',
      },
    ]);

    if (result.confirmed) {
      initProject(result.modules);
    }
  });

export default program;
