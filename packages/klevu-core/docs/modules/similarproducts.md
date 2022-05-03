# similarproducts
    Query`](modules.md#klevusimilarproductsquery) \| [`KlevuTrendingProductsQuery`](modules.md#klevutrendingproductsquery) \| [`KlevuAlsoViewedQuery`](modules.md#klevualsoviewedquery)

All possible record queries that can be used with [KlevuFetch](modules.md#klevufetch) function

#### Defined in

[models/KlevuAllRecordQueries.ts:9](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuAllRecordQueries.ts#L9)

Query

Ƭ **KlevuSimilarProductsQuery**: [`KlevuBaseQuery`](modules.md#klevubasequery) & { `settings`: { `context`: { `recentObjects`: { `records`: { `id`: `string`  }[] ; `typeOfRecord`: [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord)  }[]  }  } ; `typeOfRequest`: [`SimilarProducts`](enums/KlevuTypeOfRequest.md#similarproducts)  }

#### Defined in

[models/KlevuSimilarProductsQuery.ts:4](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuSimilarProductsQuery.ts#L4)



▸ **similarProducts**(`ids`, `options?`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

Fetch similiar products based on list of ids

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `string`[] | similiar to these ids or itemgroupids |
| `options?` | `Partial`<`Options`\> |  |
| `...modifiers` | `KlevuFetchModifer`[] | - |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/similarProducts/similarProducts.ts:24](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/similarProducts/similarProducts.ts#L24)

