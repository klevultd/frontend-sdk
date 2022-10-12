# klevunextfunc
      
Ƭ **KlevuNextFunc**: (`override?`: { `filterManager?`: [`FilterManager`](classes/FilterManager.md) ; `limit?`: `number`  }) => `Promise`<[`KlevuFetchResponse`](klevufetchresponse.md)\>

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

##### Returns

`Promise`<[`KlevuFetchResponse`](klevufetchresponse.md)\>

#### Defined in

[models/KlevuFetchResponse.ts:12](https://github.com/klevultd/frontend-sdk/blob/58d63d7/packages/klevu-core/src/models/KlevuFetchResponse.ts#L12)

