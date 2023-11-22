# klevunextfunc
      
Ƭ **KlevuNextFunc**: (`override?`: { `filterManager?`: [`FilterManager`](classes/FilterManager.md) ; `limit?`: `number` ; `pageIndex?`: `number`  }) => `Promise`<[`KlevuResponseObject`](classes/KlevuResponseObject.md)\>

#### Type declaration

▸ (`override?`): `Promise`<[`KlevuResponseObject`](classes/KlevuResponseObject.md)\>

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

`Promise`<[`KlevuResponseObject`](classes/KlevuResponseObject.md)\>

#### Defined in

[models/KlevuFetchResponse.ts:16](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuFetchResponse.ts#L16)

