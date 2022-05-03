# klevufetchfunctionreturnvalue
    

Ƭ **KlevuFetchFunctionReturnValue**: `Object`

What functions passed to KlevuFetch should implement

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `configOverride?` | [`KlevuConfig`](classes/KlevuConfig.md) | Pass down the if config has been overridden. |
| `klevuFunctionId` | `KlevuFetchTypeId` | Id of function. Used only internally |
| `modifiers?` | `KlevuFetchModifer`[] | List of modifiers set for this function |
| `params?` | `unknown` | Anything you wish to pass down as params incoming to function |
| `queries?` | [`KlevuAllRecordQueries`](modules.md#klevuallrecordqueries)[] | What queries should KlevuFetch do to backend |
| `suggestions?` | [`KlevuSuggestionQuery`](modules.md#klevusuggestionquery)[] | What suggestions queries should do to backend |

#### Defined in

[queries/index.ts:22](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/index.ts#L22)

`](modules.md#klevufetchfunctionreturnvalue) \| `Promise`<[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)\>)[] |

#### Returns

`Promise`<[`KlevuFetchResponse`](modules.md#klevufetchresponse)\>

Tools to operate results and get next results [KlevuFetchResponse](modules.md#klevufetchresponse)

#### Defined in

[connection/klevuFetch.ts:27](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/connection/klevuFetch.ts#L27)

`](modules.md#klevufetchfunctionreturnvalue)

Fetch products for a category listing page.

#### Parameters

| Name | Type |
| :------ | :------ |
| `category` | `undefined` \| `string` |
| `options?` | `Partial`<`Options`\> |
| `...modifiers` | `KlevuFetchModifer`[] |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/categoryMerchandising/categoryMerchandising.ts:28](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/categoryMerchandising/categoryMerchandising.ts#L28)

`](modules.md#klevufetchfunctionreturnvalue)

Fetches list of products. All fields are fetched.

#### Parameters

| Name | Type |
| :------ | :------ |
| `productIds` | `string`[] |
| `...modifiers` | `KlevuFetchModifer`[] |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/products/products.ts:16](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/products/products.ts#L16)

`](modules.md#klevufetchfunctionreturnvalue)

Take control and write any kind of query you wish to Klevu API. For experts only.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`KlevuBaseQuery`](modules.md#klevubasequery) |
| `...modifiers` | `KlevuFetchModifer`[] |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/raw/raw.ts:13](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/raw/raw.ts#L13)

`](modules.md#klevufetchfunctionreturnvalue)

Create a basic search to Klevu backend. Id for this query is `search`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `term` | `string` | Search term from input |
| `options?` | `Partial`<[`SearchOptions`](modules.md#searchoptions)\> | [SearchOptions](modules.md#searchoptions) |
| `...modifiers` | `KlevuFetchModifer`[] | - |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/search/search.ts:39](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/search/search.ts#L39)

`](modules.md#klevufetchfunctionreturnvalue)

Return suggestion on given search term

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `term` | `string` | search term |
| `options?` | `Partial`<`Options`\> |  |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/suggestions/suggestions.ts:24](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/suggestions/suggestions.ts#L24)

`](modules.md#klevufetchfunctionreturnvalue)

Create a trending products search query. Id for this query is `trendingProducts`

**`example`** Simple example
```
const result = await KlevuFetch(
 trendingProducts()
)

console.log(result.getQueries("trendingProducts").records)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Partial`<[`SearchOptions`](modules.md#searchoptions)\> | [search](classes/KlevuEvents.md#search) |
| `...modifiers` | `KlevuFetchModifer`[] | - |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

See {@link KlevuFetchFunction}

#### Defined in

[queries/trendingProducts/trendingProducts.ts:24](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/trendingProducts/trendingProducts.ts#L24)

`](modules.md#klevufetchfunctionreturnvalue)

Bought together recommendation on checkout page

#### Parameters

| Name | Type |
| :------ | :------ |
| `productIdsInCart` | `string`[] |
| `options` | `Partial`<`Options`\> |
| `...modifiers` | `KlevuFetchModifer`[] |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/boughtTogether/boughtTogether.ts:23](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/boughtTogether/boughtTogether.ts#L23)

`](modules.md#klevufetchfunctionreturnvalue)\>

Fetches products based on

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recommendationId` | `string` | Id of recommendation in the backend |
| `options?` | `Partial`<`Options`\> | - |
| `...modifiers` | `KlevuFetchModifer`[] | - |

#### Returns

`Promise`<[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)\>

#### Defined in

[queries/kmcRecommendation/kmcRecommendation.ts:132](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/kmcRecommendation/kmcRecommendation.ts#L132)

`](modules.md#klevufetchfunctionreturnvalue)

Get new arrival recommendations

#### Parameters

| Name | Type |
| :------ | :------ |
| `category?` | `string` |
| `options?` | `Partial`<`Options`\> |
| `...modifiers` | `KlevuFetchModifer`[] |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/newarrivals/newarrivals.ts:21](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/newarrivals/newarrivals.ts#L21)

`](modules.md#klevufetchfunctionreturnvalue)

Recently viewed products

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<`Options`\> |
| `...modifiers` | `KlevuFetchModifer`[] |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/recentlyViewedProducts/recentlyViewedProducts.ts:24](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/recentlyViewedProducts/recentlyViewedProducts.ts#L24)

`](modules.md#klevufetchfunctionreturnvalue)

Search helper function that sets correct settings

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `term` | `string` | category to find |
| `options?` | `Partial`<[`SearchOptions`](modules.md#searchoptions)\> |  |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/searchCategory/searchCategory.ts:13](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/searchCategory/searchCategory.ts#L13)

`](modules.md#klevufetchfunctionreturnvalue)

Search helper function that sets correct settings

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `term` | `string` | cms page to find |
| `options?` | `Partial`<[`SearchOptions`](modules.md#searchoptions)\> |  |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/searchCms/searchCms.ts:13](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/searchCms/searchCms.ts#L13)

`](modules.md#klevufetchfunctionreturnvalue)

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

`](modules.md#klevufetchfunctionreturnvalue)

Return trending recommendations

#### Parameters

| Name | Type |
| :------ | :------ |
| `categoryPath` | `string` |
| `options?` | `Options` |
| `...modifiers` | `KlevuFetchModifer`[] |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/trendingCategoryProducts/trendingCategoryProducts.ts:39](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/trendingCategoryProducts/trendingCategoryProducts.ts#L39)

`](modules.md#klevufetchfunctionreturnvalue) |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/fallback/fallback.ts:12](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/fallback/fallback.ts#L12)

