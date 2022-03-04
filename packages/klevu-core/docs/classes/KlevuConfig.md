[@klevu/core]() / [Exports](../modules.md) / KlevuConfig

# Class: KlevuConfig

## Table of contents

### Constructors

- [constructor](KlevuConfig.md#constructor)

### Properties

- [apiKey](KlevuConfig.md#apikey)
- [cacheMaxTTL](KlevuConfig.md#cachemaxttl)
- [eventsApiV1Url](KlevuConfig.md#eventsapiv1url)
- [eventsApiV2Url](KlevuConfig.md#eventsapiv2url)
- [url](KlevuConfig.md#url)

### Methods

- [init](KlevuConfig.md#init)

## Constructors

### constructor

• **new KlevuConfig**()

## Properties

### apiKey

▪ `Static` **apiKey**: `string`

#### Defined in

[index.ts:27](https://github.com/klevultd/frontend-sdk/blob/59ea899/packages/klevu-core/src/index.ts#L27)

___

### cacheMaxTTL

▪ `Static` **cacheMaxTTL**: `number` = `600000`

#### Defined in

[index.ts:29](https://github.com/klevultd/frontend-sdk/blob/59ea899/packages/klevu-core/src/index.ts#L29)

___

### eventsApiV1Url

▪ `Static` **eventsApiV1Url**: `string` = `"https://stats.ksearchnet.com/analytics/"`

#### Defined in

[index.ts:30](https://github.com/klevultd/frontend-sdk/blob/59ea899/packages/klevu-core/src/index.ts#L30)

___

### eventsApiV2Url

▪ `Static` **eventsApiV2Url**: `string` = `"https://stats.ksearchnet.com/analytics/collect"`

#### Defined in

[index.ts:31](https://github.com/klevultd/frontend-sdk/blob/59ea899/packages/klevu-core/src/index.ts#L31)

___

### url

▪ `Static` **url**: `string`

#### Defined in

[index.ts:28](https://github.com/klevultd/frontend-sdk/blob/59ea899/packages/klevu-core/src/index.ts#L28)

## Methods

### init

▸ `Static` **init**(`config`): `void`

Must be called once per application to initialize Klevu

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `KlevuConfiguration` |

#### Returns

`void`

#### Defined in

[index.ts:38](https://github.com/klevultd/frontend-sdk/blob/59ea899/packages/klevu-core/src/index.ts#L38)
