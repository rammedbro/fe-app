# Interface: Config

[client](../modules/client.md).Config

## Methods

### dev

▸ **dev**(): `boolean`

#### Returns

`boolean`

___

### env

▸ **env**(`value?`): `boolean` \| [`Environment`](../README.md#environment)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | [`Environment`](../README.md#environment) |

#### Returns

`boolean` \| [`Environment`](../README.md#environment)

___

### host

▸ **host**\<`T`\>(`path?`): [`HostConfig`](HostConfig.md) \| [`HostConfig`](HostConfig.md)[`T`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`HostConfig`](HostConfig.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path?` | `T` |

#### Returns

[`HostConfig`](HostConfig.md) \| [`HostConfig`](HostConfig.md)[`T`]

___

### prod

▸ **prod**(): `boolean`

#### Returns

`boolean`
