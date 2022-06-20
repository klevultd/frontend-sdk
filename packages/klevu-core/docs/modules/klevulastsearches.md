# klevulastsearches
      
• `Const` **KlevuLastSearches**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `get` | () => [`KlevuLastSearch`](klevulastsearch.md)[] |
| `save` | (`term`: `string`) => `void` |

#### Defined in

[store/lastSearches.ts:17](https://github.com/klevultd/frontend-sdk/blob/4665e27/packages/klevu-core/src/store/lastSearches.ts#L17)

## KlevuFetch Functions

### KlevuFetch

▸ **KlevuFetch**(...`functionPromises`): `Promise`<[`KlevuFetchResponse`](klevufetchresponse.md)\>

Function that makes query to KlevuBackend. It can take amount of queries.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...functionPromises` | ([`KlevuFetchFunctionReturnValue`](klevufetchfunctionreturnvalue.md) \| `Promise`<[`KlevuFetchFunctionReturnValue`](klevufetchfunctionreturnvalue.md)\>)[] |

#### Returns

`Promise`<[`KlevuFetchResponse`](klevufetchresponse.md)\>

Tools to operate results and get next results [KlevuFetchResponse](klevufetchresponse.md)

#### Defined in

[connection/klevuFetch.ts:30](https://github.com/klevultd/frontend-sdk/blob/4665e27/packages/klevu-core/src/connection/klevuFetch.ts#L30)

