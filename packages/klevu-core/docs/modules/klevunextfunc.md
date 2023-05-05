# klevunextfunc
      
Ƭ **KlevuNextFunc**: (`override?`: { `filterManager?`: [`FilterManager`](classes/FilterManager.md) ; `limit?`: `number` ; `pageIndex?`: `number`  }) => `Promise`<[`KlevuFetchResponse`](klevufetchresponse.md)\>

#### Type declaration

▸ (`override?`): `Promise`<[`KlevuFetchResponse`](klevufetchresponse.md)\>

Next function is available if there are more results in the given query.
It is optimized function that removes parts from query that might slow down
the response and they are not needed after first request.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `override?` | `Object` | - |
| `override.filterManager?` | [`FilterManager`](classes/FilterManager.md) | Filter manager to apply for next function |
| `override.limit?` | `number` | Limit number of results for next query. By default this is automatically calculated from previous result |
| `override.pageIndex?` | `number` | Use page index to load certain page instead of next available. 0 is first page |

##### Returns

`Promise`<[`KlevuFetchResponse`](klevufetchresponse.md)\>

#### Defined in

[models/KlevuFetchResponse.ts:12](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/models/KlevuFetchResponse.ts#L12)

