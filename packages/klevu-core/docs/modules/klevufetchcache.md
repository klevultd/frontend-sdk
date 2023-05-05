# klevufetchcache
      
• `Const` **klevuFetchCache**: `KlevuFetchCache`<[`KlevuPayload`](klevupayload.md), [`KlevuApiRawResponse`](klevuapirawresponse.md)\>

#### Defined in

[connection/klevuFetch.ts:19](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/connection/klevuFetch.ts#L19)

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

[connection/klevuFetch.ts:31](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/connection/klevuFetch.ts#L31)

