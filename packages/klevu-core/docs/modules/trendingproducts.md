# trendingproducts
      
▸ **trendingProducts**(`options?`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](klevufetchfunctionreturnvalue.md)

Create a trending products search query. Id for this query is `trendingProducts`

**`Example`**

Simple example
```
const result = await KlevuFetch(
 trendingProducts()
)

console.log(result.getQueries("trendingProducts").records)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Partial`<[`KlevuSearchOptions`](klevusearchoptions.md)\> | [search](search.md) |
| `...modifiers` | `KlevuFetchModifer`[] | - |

#### Returns

[`KlevuFetchFunctionReturnValue`](klevufetchfunctionreturnvalue.md)

See KlevuFetchFunction

#### Defined in

[queries/trendingProducts/trendingProducts.ts:24](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/queries/trendingProducts/trendingProducts.ts#L24)

