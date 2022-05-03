# klevuapirawresponse
    

Ƭ **KlevuApiRawResponse**: `Object`

Raw response from Klevu API

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meta` | { `qTime`: `number` ; `responseCode`: `number`  } |
| `meta.qTime` | `number` |
| `meta.responseCode` | `number` |
| `queryResults?` | [`KlevuQueryResult`](modules.md#klevuqueryresult)[] |
| `suggestionResults?` | [`KlevuSuggestionResult`](modules.md#klevusuggestionresult)[] |

#### Defined in

[models/KlevuApiRawResponse.ts:140](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L140)

`](modules.md#klevuapirawresponse) | Raw response from Klevu API |
| `next?` | (`override?`: { `filterManager?`: [`FilterManager`](classes/FilterManager.md) ; `limit?`: `number`  }) => `Promise`<[`KlevuFetchResponse`](modules.md#klevufetchresponse)\> | Next function is available if there are more results in the given query. It is optimized function that removes parts from query that might slow down the response and they are not needed after first request. |
| `queriesById` | (`id`: `string`) => `undefined` \| [`KlevuQueryResult`](modules.md#klevuqueryresult) & [`KlevuResultEvent`](modules.md#klevuresultevent) | Get query result by id |
| `suggestionsById` | (`id`: `string`) => `undefined` \| [`KlevuSuggestionResult`](modules.md#klevusuggestionresult) | Get suggestion by Id |

#### Defined in

[models/KlevuFetchResponse.ts:9](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuFetchResponse.ts#L9)

.ts:30](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L30)

.ts:55](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L55)

.ts:75](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L75)

