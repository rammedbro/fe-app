# @imolater/fe-app-codegen

Модуль кодогенерации для фронтенд проектов.

## Установка

```bash 
npm install @imolater/fe-app-cli
```

## Использование

### init-project

Первоначальная настройка проекта. Генерируются файлы husky, eslint, stylelint и т.д.

```bash
fe-app codegen init-project
```

## Модули

Для каждого выбранного модуля создается конфигурационный файл и/или добавляется скрипт запуска в `package.json`.

* [husky](https://github.com/typicode/husky)
* [lint-staged](https://github.com/okonet/lint-staged)
* [eslint](https://github.com/eslint/eslint)
* [stylelint](https://github.com/stylelint/stylelint)
* [commitlint](https://github.com/conventional-changelog/commitlint)
* [typelint](https://www.npmjs.com/package/vue-tsc)

## API

[Документация](./docs/api/README.md)
