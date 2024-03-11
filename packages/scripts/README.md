# @imolater/fe-app-scripts

Модуль с различными вспомогательными скриптами.

## Установка

```bash 
npm install @imolater/fe-app-cli
```

## Использование

### lint-types

Проверка типов проекта с помощью [vue-tsc](https://www.npmjs.com/package/vue-tsc)

```bash
fe-app scripts lint-types [files...] [options...]
```

**Аргументы**:

* `files` - Проверяемые файлы, указанные через пробел. Если оставить пустым будут проверены все файлы проекта,
  указанные в `tsconfig.json`.
* `options` - Опции vue-tsc

**Примеры**:

```bash
fe-app scripts lint-types
fe-app scripts lint-types src/index.ts src/example.ts
fe-app scripts lint-types --noEmit --skipLibCheck
fe-app scripts lint-types src/index.ts --noEmit
```

### validate-node-version

Проверка соответствия версии Node и указанной в .nvmrc

```bash
fe-app scripts validate-node-version
```

Рекомендуется добавить этот скрипт в `pre-commit` хук. Пример:

```bash
npx lint-staged # уже существующая проверка
fe-app scripts validate-node-version
```

## API

[Документация](./docs/api/README.md)
