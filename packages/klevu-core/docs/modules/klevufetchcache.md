# klevufetchcache
      
• `Const` **klevuFetchCache**: `KlevuFetchCache`<[`KlevuPayload`](klevupayload.md), [`KlevuApiRawResponse`](klevuapirawresponse.md)\>

#### Defined in

[connection/klevuFetch.ts:16](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/klevuFetch.ts#L16)

## KlevuFetch Functions

### KlevuFetch

▸ **KlevuFetch**(`...functionPromises`): `Promise`<[`KlevuResponseObject`](classes/KlevuResponseObject.md)\>

Function that makes query to KlevuBackend. It can take amount of queries.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...functionPromises` | [`KlevuFetchQueries`](klevufetchqueries.md) |

#### Returns

`Promise`<[`KlevuResponseObject`](classes/KlevuResponseObject.md)\>

Tools to operate results and get next results [KlevuFetchResponse](klevufetchresponse.md)

#### Defined in

[connection/klevuFetch.ts:28](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/klevuFetch.ts#L28)

