[@klevu/core]() / [Exports](../modules.md) / KlevuConfig

# Class: KlevuConfig

## Table of contents

### Constructors

- [constructor](KlevuConfig.md#constructor)

### Properties

- [apiKey](KlevuConfig.md#apikey)
- [axios](KlevuConfig.md#axios)
- [cacheMaxTTL](KlevuConfig.md#cachemaxttl)
- [disableClickTracking](KlevuConfig.md#disableclicktracking)
- [eventsApiV1Url](KlevuConfig.md#eventsapiv1url)
- [eventsApiV2Url](KlevuConfig.md#eventsapiv2url)
- [moiApiUrl](KlevuConfig.md#moiapiurl)
- [recommendationsApiUrl](KlevuConfig.md#recommendationsapiurl)
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

[config.ts:63](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L63)

## Properties

### apiKey

• **apiKey**: `string`

#### Defined in

[config.ts:53](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L53)

___

### axios

• `Optional` **axios**: `AxiosInstance`

#### Defined in

[config.ts:59](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L59)

___

### cacheMaxTTL

• **cacheMaxTTL**: `number` = `600_000`

#### Defined in

[config.ts:55](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L55)

___

### disableClickTracking

• **disableClickTracking**: `boolean` = `false`

#### Defined in

[config.ts:61](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L61)

___

### eventsApiV1Url

• **eventsApiV1Url**: `string` = `"https://stats.ksearchnet.com/analytics/"`

#### Defined in

[config.ts:56](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L56)

___

### eventsApiV2Url

• **eventsApiV2Url**: `string` = `"https://stats.ksearchnet.com/analytics/collect"`

#### Defined in

[config.ts:57](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L57)

___

### moiApiUrl

• **moiApiUrl**: `string` = `"https://moi-ai.ksearchnet.com/"`

#### Defined in

[config.ts:60](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L60)

___

### recommendationsApiUrl

• **recommendationsApiUrl**: `string` = `"https://config-cdn.ksearchnet.com/recommendations/"`

#### Defined in

[config.ts:58](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L58)

___

### url

• **url**: `string`

#### Defined in

[config.ts:54](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L54)

___

### default

▪ `Static` **default**: `undefined` \| [`KlevuConfig`](KlevuConfig.md)

#### Defined in

[config.ts:51](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L51)

## Methods

### getDefault

▸ `Static` **getDefault**(): [`KlevuConfig`](KlevuConfig.md)

#### Returns

[`KlevuConfig`](KlevuConfig.md)

#### Defined in

[config.ts:93](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L93)

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

[config.ts:88](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/config.ts#L88)
