# @imolater/fe-app-types

## Modules

- [Internal](modules/Internal.md)

## Namespaces

- [client](modules/client.md)
- [server](modules/server.md)

## Interfaces

- [Config](interfaces/Config.md)
- [Configs](interfaces/Configs.md)
- [FEAppConfig](interfaces/FEAppConfig.md)
- [HostConfig](interfaces/HostConfig.md)
- [Logger](interfaces/Logger.md)
- [LoggerEvent](interfaces/LoggerEvent.md)
- [LoggerOptions](interfaces/LoggerOptions.md)
- [RequestErrorData](interfaces/RequestErrorData.md)

## Type Aliases

### Environment

Ƭ **Environment**: ``"production"`` \| ``"development"``

Окружение, в котором работает приложение

___

### SentryConfig

Ƭ **SentryConfig**: `SentryCliOptions` & \{ `deploy?`: `SentryCliNewDeployOptions` ; `release`: `string` ; `sourceMaps?`: [`Omit`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys )\<`SentryCliUploadSourceMapsOptions`, ``"include"``\> & \{ `include`: `string`[]  }  }

Интерфейс объекта конфигурации @sentry/cli

___

### ViteMode

Ƭ **ViteMode**: ``"production"`` \| ``"development"``

В каком режиме запущен vite - сборщик/сервер
