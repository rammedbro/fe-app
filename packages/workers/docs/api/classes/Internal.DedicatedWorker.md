# Class: DedicatedWorker

[Internal](../modules/Internal.md).DedicatedWorker

Класс для работы с веб-воркером

**`Link`**

https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#dedicated_workers

## Constructors

### constructor

• **new DedicatedWorker**(): [`DedicatedWorker`](Internal.DedicatedWorker.md)

#### Returns

[`DedicatedWorker`](Internal.DedicatedWorker.md)

## Properties

### events

• `Private` `Readonly` **events**: [`Map`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map )\<``"app-update"`` \| ``"error"``, (`payload`: `any`) => `void`\>

___

### worker

• `Private` **worker**: ``null`` \| [`Worker`]( https://developer.mozilla.org/docs/Web/API/Worker ) = `null`

## Methods

### on

▸ **on**(`type`, `callback`): `void`

Подписка на события воркера

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"app-update"`` \| ``"error"`` |
| `callback` | (`payload`: `unknown`) => `void` |

#### Returns

`void`

___

### run

▸ **run**(`options?`): `void`

Запуск воркера

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`WorkerOptions`](../interfaces/Internal.WorkerOptions.md) |

#### Returns

`void`

**`Throws`**

___

### terminate

▸ **terminate**(): `void`

Отключение воркера

#### Returns

`void`

**`Throws`**
