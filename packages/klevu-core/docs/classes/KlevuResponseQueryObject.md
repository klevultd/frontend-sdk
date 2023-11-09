[@klevu/core]() / [Exports](../modules.md) / KlevuResponseQueryObject

# Class: KlevuResponseQueryObject

Result object for each query. A storage for results. Can be used to fetch more data, send events etc.

## Table of contents

### Constructors

- [constructor](KlevuResponseQueryObject.md#constructor)

### Properties

- [categoryMerchandisingClickEvent](KlevuResponseQueryObject.md#categorymerchandisingclickevent)
- [func](KlevuResponseQueryObject.md#func)
- [getRedirects](KlevuResponseQueryObject.md#getredirects)
- [hooks](KlevuResponseQueryObject.md#hooks)
- [query](KlevuResponseQueryObject.md#query)
- [recommendationBannerClickEvent](KlevuResponseQueryObject.md#recommendationbannerclickevent)
- [recommendationClickEvent](KlevuResponseQueryObject.md#recommendationclickevent)
- [responseObject](KlevuResponseQueryObject.md#responseobject)
- [searchClickEvent](KlevuResponseQueryObject.md#searchclickevent)

### Accessors

- [filters](KlevuResponseQueryObject.md#filters)
- [functionParams](KlevuResponseQueryObject.md#functionparams)
- [id](KlevuResponseQueryObject.md#id)
- [meta](KlevuResponseQueryObject.md#meta)
- [records](KlevuResponseQueryObject.md#records)

### Methods

- [#initEventFunctions](KlevuResponseQueryObject.md##initeventfunctions)
- [#initRedirects](KlevuResponseQueryObject.md##initredirects)
- [annotationsById](KlevuResponseQueryObject.md#annotationsbyid)
- [getBanners](KlevuResponseQueryObject.md#getbanners)
- [getPage](KlevuResponseQueryObject.md#getpage)
- [getQueryParameters](KlevuResponseQueryObject.md#getqueryparameters)
- [getTotalPages](KlevuResponseQueryObject.md#gettotalpages)
- [hasNextPage](KlevuResponseQueryObject.md#hasnextpage)

## Constructors

### constructor

• **new KlevuResponseQueryObject**(`responseObject`, `query`, `func`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `responseObject` | [`KlevuResponseObject`](KlevuResponseObject.md) |
| `query` | [`KlevuQueryResult`](../modules.md#klevuqueryresult) |
| `func` | [`KlevuFetchFunctionReturnValue`](../modules.md#klevufetchfunctionreturnvalue) |

#### Defined in

[connection/responseQueryObject.ts:65](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L65)

## Properties

### categoryMerchandisingClickEvent

• `Optional` **categoryMerchandisingClickEvent**: (`params`: { `categoryTitle`: `string` ; `override?`: `Partial`<`KlevuV1CategoryProductsView`\> ; `productId`: `string` ; `variantId?`: `string`  }) => `void`

#### Type declaration

▸ (`params`): `void`

When query is categoryMerchandising this is available. It is used to send categoryMerchandising click events

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.categoryTitle` | `string` |
| `params.override?` | `Partial`<`KlevuV1CategoryProductsView`\> |
| `params.productId` | `string` |
| `params.variantId?` | `string` |

##### Returns

`void`

#### Defined in

[connection/responseQueryObject.ts:48](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L48)

___

### func

• **func**: [`KlevuFetchFunctionReturnValue`](../modules.md#klevufetchfunctionreturnvalue)

Function used to create this query

#### Defined in

[connection/responseQueryObject.ts:33](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L33)

___

### getRedirects

• `Optional` **getRedirects**: () => `Promise`<[`KlevuKeywordUrlMap`](../interfaces/KlevuKeywordUrlMap.md)[]\>

#### Type declaration

▸ (): `Promise`<[`KlevuKeywordUrlMap`](../interfaces/KlevuKeywordUrlMap.md)[]\>

Fetches redirects for this query. This is available only for search queries

##### Returns

`Promise`<[`KlevuKeywordUrlMap`](../interfaces/KlevuKeywordUrlMap.md)[]\>

#### Defined in

[connection/responseQueryObject.ts:63](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L63)

___

### hooks

• **hooks**: [`KlevuResultEventOnResult`](../modules.md#klevuresulteventonresult)[] = `[]`

Hooks that can be used to listen for events

#### Defined in

[connection/responseQueryObject.ts:38](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L38)

___

### query

• **query**: [`KlevuQueryResult`](../modules.md#klevuqueryresult)

This query

#### Defined in

[connection/responseQueryObject.ts:28](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L28)

___

### recommendationBannerClickEvent

• `Optional` **recommendationBannerClickEvent**: (`params`: { `resolution`: ``"desktop"`` \| ``"mobile"``  }) => `void`

#### Type declaration

▸ (`params`): `void`

When there is a banner in the recommendation this is available. It is used to send recommendation banner click events

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.resolution` | ``"desktop"`` \| ``"mobile"`` |

##### Returns

`void`

#### Defined in

[connection/responseQueryObject.ts:58](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L58)

___

### recommendationClickEvent

• `Optional` **recommendationClickEvent**: (`params`: { `override?`: `Partial`<`KlevuRecommendationsEventV2Data`\> ; `productId`: `string` ; `variantId?`: `string`  }) => `void`

#### Type declaration

▸ (`params`): `void`

When query is recommendation this is available. It is used to send recommendation click events

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.override?` | `Partial`<`KlevuRecommendationsEventV2Data`\> |
| `params.productId` | `string` |
| `params.variantId?` | `string` |

##### Returns

`void`

#### Defined in

[connection/responseQueryObject.ts:53](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L53)

___

### responseObject

• **responseObject**: [`KlevuResponseObject`](KlevuResponseObject.md)

Original request response that includes all queries

#### Defined in

[connection/responseQueryObject.ts:23](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L23)

___

### searchClickEvent

• `Optional` **searchClickEvent**: (`params`: { `autoSendViewEvent?`: `boolean` ; `override?`: `Partial`<`V1SearchEvent`\> ; `productId`: `string` ; `variantId?`: `string`  }) => `void`

#### Type declaration

▸ (`params`): `void`

When query is search this is available. It is used to send search click events

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.autoSendViewEvent?` | `boolean` |
| `params.override?` | `Partial`<`V1SearchEvent`\> |
| `params.productId` | `string` |
| `params.variantId?` | `string` |

##### Returns

`void`

#### Defined in

[connection/responseQueryObject.ts:43](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L43)

## Accessors

### filters

• `get` **filters**(): `undefined` \| ([`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions) \| [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider) \| [`KlevuFilterResultRating`](../modules.md#klevufilterresultrating))[]

All filters related to this query

#### Returns

`undefined` \| ([`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions) \| [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider) \| [`KlevuFilterResultRating`](../modules.md#klevufilterresultrating))[]

#### Defined in

[connection/responseQueryObject.ts:80](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L80)

___

### functionParams

• `get` **functionParams**(): `undefined` \| [`KlevuFetchFunctionParams`](../modules.md#klevufetchfunctionparams)

Special parameters that are saved to query

#### Returns

`undefined` \| [`KlevuFetchFunctionParams`](../modules.md#klevufetchfunctionparams)

#### Defined in

[connection/responseQueryObject.ts:108](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L108)

___

### id

• `get` **id**(): `string`

Id if the query

#### Returns

`string`

#### Defined in

[connection/responseQueryObject.ts:87](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L87)

___

### meta

• `get` **meta**(): `Object`

Meta data of the query

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | `string` | Klevu API key |
| `debuggingInformation` | `unknown` | Information that can be useful for debugging the query. For example, the actual query that was fired by the Klevu Search engine, inclusive of any synonyms or de-compounded words taken into consideration. |
| `isPersonalised` | `boolean` | - |
| `klevuImageData?` | { `processed`: { `urls`: `string`[]  }[]  } | The urls processed in case of image search |
| `klevuImageData.processed` | { `urls`: `string`[]  }[] | - |
| `noOfResults` | `number` | The number of results requested to be returned for this query. |
| `notificationCode` | `number` | This may be populated with a code if any actions were taken on the record. Possible values are: 1: Nothing to report. 2: The price of the record is using the base currency. |
| `offset` | `number` | The index of the first result returned in this response. |
| `qTime` | `number` | The time taken by the Klevu Search engine to fetch the response. |
| `searchedTerm` | `string` | The search term submitted for this query. |
| `totalResultsFound` | `number` | The total number of results found for this query. |
| `typeOfSearch` | [`KlevuTypeOfSearch`](../enums/KlevuTypeOfSearch.md) | The query type that was executed by Klevu to retrieve the results. |

#### Defined in

[connection/responseQueryObject.ts:94](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L94)

___

### records

• `get` **records**(): { `id`: `string`  } & [`KlevuRecord`](../modules.md#klevurecord)[]

Records of the query

#### Returns

{ `id`: `string`  } & [`KlevuRecord`](../modules.md#klevurecord)[]

#### Defined in

[connection/responseQueryObject.ts:101](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L101)

## Methods

### #initEventFunctions

▸ `Private` **#initEventFunctions**(): `void`

#### Returns

`void`

#### Defined in

[connection/responseQueryObject.ts:206](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L206)

___

### #initRedirects

▸ `Private` **#initRedirects**(): `void`

#### Returns

`void`

#### Defined in

[connection/responseQueryObject.ts:194](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L194)

___

### annotationsById

▸ **annotationsById**(`productId`, `languageCode`): `Promise`<`undefined` \| [`KlevuAnnotations`](../modules.md#klevuannotations)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `productId` | `string` |
| `languageCode` | `string` |

#### Returns

`Promise`<`undefined` \| [`KlevuAnnotations`](../modules.md#klevuannotations)\>

#### Defined in

[connection/responseQueryObject.ts:400](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L400)

___

### getBanners

▸ **getBanners**(`params?`): `Promise`<[`KlevuBanner`](../interfaces/KlevuBanner.md)[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | in case of search query you need to specify location of search |
| `params.searchType?` | ``"landingpage"`` \| ``"quicksearch"`` | - |

#### Returns

`Promise`<[`KlevuBanner`](../interfaces/KlevuBanner.md)[]\>

List of banners that were received for this query

#### Defined in

[connection/responseQueryObject.ts:408](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L408)

___

### getPage

▸ **getPage**(`params?`): `Promise`<`undefined` \| [`KlevuResponseObject`](KlevuResponseObject.md)\>

Fetches page of results. If pageIndex is not defined it will fetch next page.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | `Object` |  |
| `params.filterManager?` | [`FilterManager`](FilterManager.md) | Filter manager to apply for next function |
| `params.limit?` | `number` | Limit number of results for next query. By default this is automatically calculated from previous result |
| `params.pageIndex?` | `number` | Use page index to load certain page instead of next available. 0 is first page |

#### Returns

`Promise`<`undefined` \| [`KlevuResponseObject`](KlevuResponseObject.md)\>

#### Defined in

[connection/responseQueryObject.ts:118](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L118)

___

### getQueryParameters

▸ **getQueryParameters**(): `undefined` \| [`KlevuFetchFunctionParams`](../modules.md#klevufetchfunctionparams)

#### Returns

`undefined` \| [`KlevuFetchFunctionParams`](../modules.md#klevufetchfunctionparams)

List of params used in the query and the metadata that was generated during
the query. This is useful for example to fetching KMC metadata that was received
for recommendations query.

#### Defined in

[connection/responseQueryObject.ts:421](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L421)

___

### getTotalPages

▸ **getTotalPages**(): `number`

#### Returns

`number`

total number of pages

#### Defined in

[connection/responseQueryObject.ts:190](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L190)

___

### hasNextPage

▸ **hasNextPage**(): `boolean`

#### Returns

`boolean`

true if there are more pages to fetch

#### Defined in

[connection/responseQueryObject.ts:179](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseQueryObject.ts#L179)
