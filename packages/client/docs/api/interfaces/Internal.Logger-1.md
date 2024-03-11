# Interface: Logger

[Internal](../modules/Internal.md).Logger

Интерфейс объекта логгера

## Implemented by

- [`Logger`](../classes/Internal.Logger.md)

## Methods

### error

▸ **error**(`event`): `void`

Отправка события типа "error"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`LoggerEvent`](Internal.LoggerEvent.md) | объект события |

#### Returns

`void`

___

### info

▸ **info**(`event`): `void`

Отправка события типа "info"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`LoggerEvent`](Internal.LoggerEvent.md) | объект события |

#### Returns

`void`

___

### send

▸ **send**(`event`): `void`

Отправка события

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`LoggerEvent`](Internal.LoggerEvent.md) | объект события |

#### Returns

`void`

___

### warn

▸ **warn**(`event`): `void`

Отправка события типа "warn"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`LoggerEvent`](Internal.LoggerEvent.md) | объект события |

#### Returns

`void`
