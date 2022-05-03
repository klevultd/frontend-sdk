# klevufetchresponse
    

Ƭ **KlevuFetchResponse**: `Object`

Tools for operating results in easier way.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiResponse` | ``null`` \| [`KlevuApiRawResponse`](modules.md#klevuapirawresponse) | Raw response from Klevu API |
| `next?` | (`override?`: { `filterManager?`: [`FilterManager`](classes/FilterManager.md) ; `limit?`: `number`  }) => `Promise`<[`KlevuFetchResponse`](modules.md#klevufetchresponse)\> | Next function is available if there are more results in the given query. It is optimized function that removes parts from query that might slow down the response and they are not needed after first request. |
| `queriesById` | (`id`: `string`) => `undefined` \| [`KlevuQueryResult`](modules.md#klevuqueryresult) & [`KlevuResultEvent`](modules.md#klevuresultevent) | Get query result by id |
| `suggestionsById` | (`id`: `string`) => `undefined` \| [`KlevuSuggestionResult`](modules.md#klevusuggestionresult) | Get suggestion by Id |

#### Defined in

[models/KlevuFetchResponse.ts:9](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuFetchResponse.ts#L9)

`](modules.md#klevufetchresponse)\>

Function that makes query to KlevuBackend. It can take amount of queries.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...functionPromises` | ([`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue) \| `Promise`<[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)\>)[] |

#### Returns

`Promise`<[`KlevuFetchResponse`](modules.md#klevufetchresponse)\>

Tools to operate results and get next results [KlevuFetchResponse](modules.md#klevufetchresponse)

#### Defined in

[connection/klevuFetch.ts:27](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/connection/klevuFetch.ts#L27)

