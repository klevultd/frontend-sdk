[@klevu/core]() / [Exports](../modules.md) / KlevuConfig

# Class: KlevuConfig

## Table of contents

### Constructors

- [constructor](KlevuConfig.md#constructor)

### Properties

- [apiKey](KlevuConfig.md#apikey)
- [axios](KlevuConfig.md#axios)
- [cacheMaxTTL](KlevuConfig.md#cachemaxttl)
- [eventsApiV1Url](KlevuConfig.md#eventsapiv1url)
- [eventsApiV2Url](KlevuConfig.md#eventsapiv2url)
- [url](KlevuConfig.md#url)
- [default](KlevuConfig.md#default)

### Methods

- [getDefault](KlevuConfig.md#getdefault)
- [init](KlevuConfig.md#init)

## Constructors

### constructor

• **new KlevuConfig**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `KlevuConfiguration` |

#### Defined in

[config.ts:44](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/config.ts#L44)

## Properties

### apiKey

• **apiKey**: `string`

#### Defined in

[config.ts:37](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/config.ts#L37)

___

### axios

• `Optional` **axios**: `AxiosStatic`

#### Defined in

[config.ts:42](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/config.ts#L42)

___

### cacheMaxTTL

• **cacheMaxTTL**: `number` = `600_000`

#### Defined in

[config.ts:39](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/config.ts#L39)

___

### eventsApiV1Url

• **eventsApiV1Url**: `string` = `"https://stats.ksearchnet.com/analytics/"`

#### Defined in

[config.ts:40](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/config.ts#L40)

___

### eventsApiV2Url

• **eventsApiV2Url**: `string` = `"https://stats.ksearchnet.com/analytics/collect"`

#### Defined in

[config.ts:41](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/config.ts#L41)

___

### url

• **url**: `string`

#### Defined in

[config.ts:38](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/config.ts#L38)

___

### default

▪ `Static` **default**: `undefined` \| [`KlevuConfig`](KlevuConfig.md)

#### Defined in

[config.ts:35](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/config.ts#L35)

## Methods

### getDefault

▸ `Static` **getDefault**(): [`KlevuConfig`](KlevuConfig.md)

#### Returns

[`KlevuConfig`](KlevuConfig.md)

#### Defined in

[config.ts:57](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/config.ts#L57)

___

### init

▸ `Static` **init**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `KlevuConfiguration` |

#### Returns

`void`

#### Defined in

[config.ts:53](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/config.ts#L53)
