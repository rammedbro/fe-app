# Class: Logger

[Internal](../modules/Internal.md).Logger

Интерфейс объекта логгера

## Implements

- [`Logger`](../interfaces/Internal.Logger-1.md)

## Constructors

### constructor

• **new Logger**(`options?`): [`Logger`](Internal.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`LoggerOptions`](../interfaces/Internal.LoggerOptions.md) |

#### Returns

[`Logger`](Internal.Logger.md)

## Properties

### options

• `Private` `Readonly` **options**: [`LoggerOptions`](../interfaces/Internal.LoggerOptions.md)

## Methods

### error

▸ **error**(`«destructured»`): `void`

Отправка события типа "error"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | [`LoggerEvent`](../interfaces/Internal.LoggerEvent.md) | объект события |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/Internal.Logger-1.md).[error](../interfaces/Internal.Logger-1.md#error)

___

### info

▸ **info**(`«destructured»`): `void`

Отправка события типа "info"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | [`LoggerEvent`](../interfaces/Internal.LoggerEvent.md) | объект события |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/Internal.Logger-1.md).[info](../interfaces/Internal.Logger-1.md#info)

___

### send

▸ **send**(`event`): `void`

Отправка события

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`LoggerEvent`](../interfaces/Internal.LoggerEvent.md) | объект события |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/Internal.Logger-1.md).[send](../interfaces/Internal.Logger-1.md#send)

___

### warn

▸ **warn**(`«destructured»`): `void`

Отправка события типа "warn"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | [`LoggerEvent`](../interfaces/Internal.LoggerEvent.md) | объект события |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/Internal.Logger-1.md).[warn](../interfaces/Internal.Logger-1.md#warn)
