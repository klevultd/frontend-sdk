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

- [init](KlevuConfig.md#init)

## Constructors

### constructor

• **new KlevuConfig**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `KlevuConfiguration` |

#### Defined in

[config.ts:43](https://github.com/klevultd/frontend-sdk/blob/d712c6c/packages/klevu-core/src/config.ts#L43)

## Properties

### apiKey

• **apiKey**: `string`

#### Defined in

[config.ts:36](https://github.com/klevultd/frontend-sdk/blob/d712c6c/packages/klevu-core/src/config.ts#L36)

___

### axios

• `Optional` **axios**: `AxiosStatic`

#### Defined in

[config.ts:41](https://github.com/klevultd/frontend-sdk/blob/d712c6c/packages/klevu-core/src/config.ts#L41)

___

### cacheMaxTTL

• **cacheMaxTTL**: `number` = `600_000`

#### Defined in

[config.ts:38](https://github.com/klevultd/frontend-sdk/blob/d712c6c/packages/klevu-core/src/config.ts#L38)

___

### eventsApiV1Url

• **eventsApiV1Url**: `string` = `"https://stats.ksearchnet.com/analytics/"`

#### Defined in

[config.ts:39](https://github.com/klevultd/frontend-sdk/blob/d712c6c/packages/klevu-core/src/config.ts#L39)

___

### eventsApiV2Url

• **eventsApiV2Url**: `string` = `"https://stats.ksearchnet.com/analytics/collect"`

#### Defined in

[config.ts:40](https://github.com/klevultd/frontend-sdk/blob/d712c6c/packages/klevu-core/src/config.ts#L40)

___

### url

• **url**: `string`

#### Defined in

[config.ts:37](https://github.com/klevultd/frontend-sdk/blob/d712c6c/packages/klevu-core/src/config.ts#L37)

___

### default

▪ `Static` **default**: [`KlevuConfig`](KlevuConfig.md)

#### Defined in

[config.ts:34](https://github.com/klevultd/frontend-sdk/blob/d712c6c/packages/klevu-core/src/config.ts#L34)

## Methods

### init

▸ `Static` **init**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `KlevuConfiguration` |

#### Returns

`void`

#### Defined in

[config.ts:52](https://github.com/klevultd/frontend-sdk/blob/d712c6c/packages/klevu-core/src/config.ts#L52)
