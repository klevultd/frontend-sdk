# klevulastsearches
    

• `Const` **KlevuLastSearches**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `get` | () => [`KlevuLastSearch`](modules.md#klevulastsearch)[] |
| `save` | (`term`: `string`) => `void` |

#### Defined in

[store/lastSearches.ts:17](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/store/lastSearches.ts#L17)

## KlevuFetch Functions

### KlevuFetch

▸ **KlevuFetch**(...`functionPromises`): `Promise`<[`KlevuFetchResponse`](modules.md#klevufetchresponse)\>

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

