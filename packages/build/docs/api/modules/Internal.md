# Module: Internal

## Interfaces

- [Config$1](../interfaces/Internal.Config_1.md)
- [Configs](../interfaces/Internal.Configs.md)
- [HostConfig](../interfaces/Internal.HostConfig.md)
- [Options](../interfaces/Internal.Options.md)
- [ViteLibBuildOptions](../interfaces/Internal.ViteLibBuildOptions.md)
- [ViteLibConfig](../interfaces/Internal.ViteLibConfig.md)

## Type Aliases

### Environment

Ƭ **Environment**: ``"production"`` \| ``"development"``

Окружение, в котором работает приложение

___

### Id

Ƭ **Id**\<`T`\>: `T` extends infer U ? \{ [K in keyof U]: U[K] } : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

___

### OptionalPropertyNames

Ƭ **OptionalPropertyNames**\<`T`\>: \{ [K in keyof T]-?: object extends \{ [P in K]: T[K] } ? K : never }[keyof `T`]

#### Type parameters

| Name |
| :------ |
| `T` |

___

### Spread

Ƭ **Spread**\<`A`\>: `A` extends [infer L, ...(infer R)] ? [`SpreadTwo`](Internal.md#spreadtwo)\<`L`, [`Spread`](Internal.md#spread)\<`R`\>\> : `unknown`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly [...any] |

___

### SpreadProperties

Ƭ **SpreadProperties**\<`L`, `R`, `K`\>: \{ [P in K]: L[P] \| Exclude\<R[P], undefined\> }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `L` | `L` |
| `R` | `R` |
| `K` | extends keyof `L` & keyof `R` |

___

### SpreadTwo

Ƭ **SpreadTwo**\<`L`, `R`\>: [`Id`](Internal.md#id)\<[`Pick`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys )\<`L`, [`Exclude`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers )\<keyof `L`, keyof `R`\>\> & [`Pick`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys )\<`R`, [`Exclude`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers )\<keyof `R`, [`OptionalPropertyNames`](Internal.md#optionalpropertynames)\<`R`\>\>\> & [`Pick`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys )\<`R`, [`Exclude`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers )\<[`OptionalPropertyNames`](Internal.md#optionalpropertynames)\<`R`\>, keyof `L`\>\> & [`SpreadProperties`](Internal.md#spreadproperties)\<`L`, `R`, [`OptionalPropertyNames`](Internal.md#optionalpropertynames)\<`R`\> & keyof `L`\>\>

#### Type parameters

| Name |
| :------ |
| `L` |
| `R` |

___

### ViteConfig

Ƭ **ViteConfig**: `InlineConfig` & \{ `build`: \{ `assetsDir`: `string` ; `libConfigs`: [`ViteLibConfig`](../interfaces/Internal.ViteLibConfig.md)[] ; `meta`: \{ `configs`: [`Configs`](../interfaces/Internal.Configs.md)  } ; `outDir`: `string`  } ; `mode`: [`ViteMode`](Internal.md#vitemode) ; `plugins`: `PluginOption`[] ; `resolve`: \{ `alias`: [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`string`, `string`\>  }  }

Основной vite конфиг

___

### ViteMode

Ƭ **ViteMode**: ``"production"`` \| ``"development"``

В каком режиме запущен vite - сборщик/сервер
