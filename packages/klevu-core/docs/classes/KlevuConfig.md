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
- [moiApiUrl](KlevuConfig.md#moiapiurl)
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

[config.ts:51](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/config.ts#L51)

## Properties

### apiKey

• **apiKey**: `string`

#### Defined in

[config.ts:43](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/config.ts#L43)

___

### axios

• `Optional` **axios**: `AxiosInstance`

#### Defined in

[config.ts:48](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/config.ts#L48)

___

### cacheMaxTTL

• **cacheMaxTTL**: `number` = `600_000`

#### Defined in

[config.ts:45](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/config.ts#L45)

___

### eventsApiV1Url

• **eventsApiV1Url**: `string` = `"https://stats.ksearchnet.com/analytics/"`

#### Defined in

[config.ts:46](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/config.ts#L46)

___

### eventsApiV2Url

• **eventsApiV2Url**: `string` = `"https://stats.ksearchnet.com/analytics/collect"`

#### Defined in

[config.ts:47](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/config.ts#L47)

___

### moiApiUrl

• **moiApiUrl**: `string` = `"https://moi-ai.ksearchnet.com/"`

#### Defined in

[config.ts:49](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/config.ts#L49)

___

### url

• **url**: `string`

#### Defined in

[config.ts:44](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/config.ts#L44)

___

### default

▪ `Static` **default**: `undefined` \| [`KlevuConfig`](KlevuConfig.md)

#### Defined in

[config.ts:41](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/config.ts#L41)

## Methods

### getDefault

▸ `Static` **getDefault**(): [`KlevuConfig`](KlevuConfig.md)

#### Returns

[`KlevuConfig`](KlevuConfig.md)

#### Defined in

[config.ts:70](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/config.ts#L70)

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

[config.ts:65](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/config.ts#L65)
