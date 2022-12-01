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

[config.ts:45](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/config.ts#L45)

## Properties

### apiKey

• **apiKey**: `string`

#### Defined in

[config.ts:38](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/config.ts#L38)

___

### axios

• `Optional` **axios**: `AxiosStatic`

#### Defined in

[config.ts:43](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/config.ts#L43)

___

### cacheMaxTTL

• **cacheMaxTTL**: `number` = `600_000`

#### Defined in

[config.ts:40](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/config.ts#L40)

___

### eventsApiV1Url

• **eventsApiV1Url**: `string` = `"https://stats.ksearchnet.com/analytics/"`

#### Defined in

[config.ts:41](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/config.ts#L41)

___

### eventsApiV2Url

• **eventsApiV2Url**: `string` = `"https://stats.ksearchnet.com/analytics/collect"`

#### Defined in

[config.ts:42](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/config.ts#L42)

___

### url

• **url**: `string`

#### Defined in

[config.ts:39](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/config.ts#L39)

___

### default

▪ `Static` **default**: `undefined` \| [`KlevuConfig`](KlevuConfig.md)

#### Defined in

[config.ts:36](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/config.ts#L36)

## Methods

### getDefault

▸ `Static` **getDefault**(): [`KlevuConfig`](KlevuConfig.md)

#### Returns

[`KlevuConfig`](KlevuConfig.md)

#### Defined in

[config.ts:59](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/config.ts#L59)

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

[config.ts:54](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/config.ts#L54)
