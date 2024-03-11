# Interface: Application

[server](../modules/server.md).Application

Модифицированный express сервер

## Hierarchy

- [`Express`](../modules/Internal.md#express)

  ↳ **`Application`**

## Properties

### extendServer

• **extendServer**: (`extend`: (`server`: [`Server`](server.Server.md)) => `void`) => `void`

Модификация инстанса сервера получаемого при вызове метода listen у инстанса express приложения

#### Type declaration

▸ (`extend`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `extend` | (`server`: [`Server`](server.Server.md)) => `void` |

##### Returns

`void`

___

### listen

• **listen**: (`callback?`: () => `void`) => [`Server`](server.Server.md)

Модифицированный метод listen, принимающий только callback

#### Type declaration

▸ (`callback?`): [`Server`](server.Server.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | () => `void` |

##### Returns

[`Server`](server.Server.md)

___

### useRequestProxy

• **useRequestProxy**: (`routes`: [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`string`, `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`string`, `any`\>\>\>, `options?`: \{ `protocol?`: `string`  }) => `void`

Проксирование запросов к модулю

#### Type declaration

▸ (`routes`, `options?`): `void`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `routes` | [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`string`, `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`string`, `any`\>\>\> | Проксируемые роуты модуля |
| `options?` | `Object` | Опции |
| `options.protocol?` | `string` | Протокол по которому выполняется подключение к оригинальному адресу модуля |

##### Returns

`void`

___

### useSocketProxy

• **useSocketProxy**: (`events`: [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`string`, [`SocketEventHandler`](../modules/Internal.md#socketeventhandler)\>, `options?`: \{ `path?`: `string` ; `protocol?`: `string`  }) => `void`

Проксирование websocket событий модуля

#### Type declaration

▸ (`events`, `options?`): `void`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `events` | [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`string`, [`SocketEventHandler`](../modules/Internal.md#socketeventhandler)\> | Проксируемые события модуля |
| `options?` | `Object` | Опции |
| `options.path?` | `string` | Путь по которому слушает websocket сервер |
| `options.protocol?` | `string` | Протокол по которому выполняется подключение к оригинальному адресу модуля |

##### Returns

`void`
