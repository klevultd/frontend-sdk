# klevuhydratepackedfetchresult
      
▸ **KlevuHydratePackedFetchResult**(`packed`, `functions`): `Promise`<[`KlevuResponseObject`](classes/KlevuResponseObject.md)\>

This function hydrates KlevuFetch response object from raw JSON that was fetched on server side.
It doesn't do request to Klevu API, but it will do requests that are made with logic of queries.
For example all analytical requests are automatically sent from client.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packed` | [`KlevuApiRawResponse`](klevuapirawresponse.md) | Raw JSON from KlevuFetch |
| `functions` | [`KlevuFetchQueries`](klevufetchqueries.md) | Query functions used to create KlevuFetch query in backend. |

#### Returns

`Promise`<[`KlevuResponseObject`](classes/KlevuResponseObject.md)\>

KlevuFetch response without making any request to servers

#### Defined in

[connection/hydration.ts:30](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/hydration.ts#L30)

