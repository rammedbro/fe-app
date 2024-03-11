# Interface: Logger

Интерфейс объекта логгера

## Methods

### error

▸ **error**(`event`): `void`

Отправка события типа "error"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`LoggerEvent`](LoggerEvent.md) | объект события |

#### Returns

`void`

___

### info

▸ **info**(`event`): `void`

Отправка события типа "info"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`LoggerEvent`](LoggerEvent.md) | объект события |

#### Returns

`void`

___

### send

▸ **send**(`event`): `void`

Отправка события

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`LoggerEvent`](LoggerEvent.md) | объект события |

#### Returns

`void`

___

### warn

▸ **warn**(`event`): `void`

Отправка события типа "warn"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`LoggerEvent`](LoggerEvent.md) | объект события |

#### Returns

`void`
