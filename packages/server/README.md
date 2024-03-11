# @imolater/fe-app-server

Серверный модуль написанный на [express](https://expressjs.com/) с раздачей статики и роутингом всех остальных
запросов на `index.html` (spa приложение собранное на vite).

## Установка

```bash 
npm install @imolater/fe-app-cli
```

## Настройка

Данному модулю в конфигурационном файле `--fe-app-config` соответствует ключ
[server](../types/docs/api/interfaces/FEAppConfig.md#server).

## Использование

### start

Запуск сервера в режиме `production`

```bash
fe-app start
```

### dev

Запуск сервера в режиме `development`

```bash
fe-app dev [options]
```

**Опции**:

* `--fe-app-config` - путь до конфиг файла fe-app, экспортирующего объект типа
  [FEAppConfig](../types/docs/api/interfaces/FEAppConfig.md). По умолчанию равен `fe-app.config.ts`.
* `--server-config` - путь до конфиг файла сервера, экспортирующего функцию типа
  [ServerConfig](../types/docs/api/modules/server.md#serverconfig)
* `--client-config` - путь до конфиг файла клиента, экспортирующего функцию типа
  [ClientConfig](../types/docs/api/modules/client.md#clientconfig)
* `--vite-config` - путь до конфиг файла сборки, экспортирующего вызов функции vite `defineConfig`

**Примеры**:

```bash
fe-app dev
fe-app dev --fe-app-config=fe-app.config.ts --vite-config=vite.config.ts --client-config=client.config.ts 
--server-config=server.config.ts

```

## API

[Документация](./docs/api/README.md)
