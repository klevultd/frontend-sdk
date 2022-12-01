# klevulastsearches
      
• `Const` **KlevuLastSearches**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `get` | () => [`KlevuLastSearch`](klevulastsearch.md)[] |
| `save` | (`term`: `string`) => `void` |

#### Defined in

[store/lastSearches.ts:19](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/store/lastSearches.ts#L19)

## KlevuFetch Functions

### KlevuFetch

▸ **KlevuFetch**(...`functionPromises`): `Promise`<[`KlevuFetchResponse`](klevufetchresponse.md)\>

Function that makes query to KlevuBackend. It can take amount of queries.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...functionPromises` | [`KlevuFetchQueries`](klevufetchqueries.md) |

#### Returns

`Promise`<[`KlevuFetchResponse`](klevufetchresponse.md)\>

Tools to operate results and get next results [KlevuFetchResponse](klevufetchresponse.md)

#### Defined in

[connection/klevuFetch.ts:28](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/connection/klevuFetch.ts#L28)

