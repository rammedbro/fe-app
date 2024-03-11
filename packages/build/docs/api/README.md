# @imolater/fe-app-build

## Modules

- [Internal](modules/Internal.md)

## Functions

### build

▸ **build**(`configs?`): [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`void`\>

Сборка проекта в режиме production

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configs` | [`Configs`](interfaces/Internal.Configs.md) | Опции для указания путей до конфиг файлов |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`void`\>

___

### createDevServer

▸ **createDevServer**(`configs?`): [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`ViteDevServer`\>

Сборка dev сервера vite

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configs` | [`Configs`](interfaces/Internal.Configs.md) | опции для указания путей до конфиг файлов |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`ViteDevServer`\>

___

### deepmerge

▸ **deepmerge**\<`O`\>(`...objects`): [`Spread`](modules/Internal.md#spread)\<`O`\>

Deep merge object with types

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends (`undefined` \| `object`)[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...objects` | [...O[]] | Objects to merge |

#### Returns

[`Spread`](modules/Internal.md#spread)\<`O`\>

**`Link`**

https://stackoverflow.com/questions/49682569/typescript-merge-object-types/49683575#49683575

___

### fileBasename

▸ **fileBasename**(`filename`, `ext?`): `string`

Получение имени файла из пути

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `filename` | `string` | `undefined` | Путь до файла |
| `ext` | `string` \| `boolean` | `true` | Включить в имя расширение файла. Если передать расширение в виде строки, то оно будет подставлено вместо оригинального. По-умолчанию - true. |

#### Returns

`string`

___

### getConfig

▸ **getConfig**(): [`Config$1`](interfaces/Internal.Config_1.md)

Получение конфига am-config

#### Returns

[`Config$1`](interfaces/Internal.Config_1.md)

___

### getViteConfig

▸ **getViteConfig**(`mode`, `configs?`): [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<[`ViteConfig`](modules/Internal.md#viteconfig)\>

Получение vite конфига

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mode` | [`ViteMode`](modules/Internal.md#vitemode) | режим работы vite |
| `configs` | [`Configs`](interfaces/Internal.Configs.md) | опции для указания путей до конфиг файлов |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<[`ViteConfig`](modules/Internal.md#viteconfig)\>

___

### loadModule

▸ **loadModule**\<`T`\>(`path`, `options?`): `T`

Загрузка модулей с возможностью пре-компиляции esm и ts модулей

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Путь загружаемого модуля |
| `options` | [`Options`](interfaces/Internal.Options.md) | Опции |

#### Returns

`T`

- Возвращает модуль типа Т

___

### mapObjectValues

▸ **mapObjectValues**\<`K`, `V`, `R`\>(`object`, `callback`): [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`K`, `R`\>

Преобразование значений объекта с приведением к новому тип

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `V` | `V` |
| `R` | `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`K`, `V`\> |
| `callback` | (`value`: `V`) => `R` |

#### Returns

[`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`K`, `R`\>

___

### resolveFeAppConfigs

▸ **resolveFeAppConfigs**(`fromConfig`, `fromCli`): [`Configs`](interfaces/Internal.Configs.md)

Разрешение путей до конфиг файлов fe-app

Получение итоговых путей до конфиг файлов fe-app на основе опций cli и fe-app.config.
Приоритет отдается опциям cli.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromConfig` | [`Configs`](interfaces/Internal.Configs.md) | Объект путей из fe-app.config |
| `fromCli` | [`Configs`](interfaces/Internal.Configs.md) | Объект путей из cli |

#### Returns

[`Configs`](interfaces/Internal.Configs.md)
