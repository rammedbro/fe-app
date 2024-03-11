# @imolater/fe-app-build

Модуль сборки с использованием [vite](https://vitejs.dev/).

## Установка

```bash 
npm install @imolater/fe-app-cli
```

## Настройка

Данному модулю в конфигурационном файле `--fe-app-config` соответствует ключ
[build](../types/docs/api/interfaces/FEAppConfig.md#build).

## Использование

### build

Запуск сборки в режиме `production`

```bash
fe-app build [options]
```

**Опции**:

* `--fe-app-config` - путь до конфиг файла fe-app, экспортирующего объект типа
  [FEAppConfig](../types/docs/api/interfaces/FEAppConfig.md). По умолчанию равен `fe-app.config.ts`.
* `--vite-config` - путь до конфиг файла сборки, экспортирующего вызов функции vite `defineConfig`

**Примеры**:

```bash
fe-app build
fe-app build --fe-app-config=fe-app.config.ts --vite-config=vite.config.ts
```

## API

[Документация](./docs/api/README.md)
