# Interface: FEAppConfig

Интерфейс объекта конфигурации fe-app

## Properties

### build

• `Optional` **build**: `Object`

Настройка сборки

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `useAutoImport?` | `boolean` \| [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )\<`UnimportPluginOptions`\> | Включить в сборку авто импорты. По умолчанию включена только библиотека vue |
| `useFavicon?` | [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<[`Environment`](../README.md#environment), `string`\> | Включить в сборку динамический favicon |
| `useGlobal?` | `boolean` | Включить поддержку глобальной переменной global |
| `useTsConfigPaths?` | `boolean` | Включить поддержку алиасов из tsconfig Не работает для любых файлов стилей. В них следует использовать только алиас "@" для папки "src". |
| `useWorkers?` | \{ `dedicated`: `boolean`  } | Включить в сборку воркеры |
| `useWorkers.dedicated` | `boolean` | - |

___

### configs

• `Optional` **configs**: [`Configs`](Configs.md)

Пути до конфигурационных файлов

___

### logLevel

• `Optional` **logLevel**: ``"all"`` \| ``"error"``

Уровень логирования *

___

### server

• `Optional` **server**: `Object`

Настройка сервера

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `metrics?` | `boolean` | Включить сбор метрик * |
| `sentry?` | [`SentryConfig`](../README.md#sentryconfig) | Настройки sentry * |
