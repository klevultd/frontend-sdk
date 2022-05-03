# klevufetch
    ](modules.md#klevufetch) function

#### Defined in

[models/KlevuAllRecordQueries.ts:9](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuAllRecordQueries.ts#L9)

FunctionReturnValue

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

Response

Ƭ **KlevuFetchResponse**: `Object`

Tools for operating results in easier way.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiResponse` | ``null`` \| [`KlevuApiRawResponse`](modules.md#klevuapirawresponse) | Raw response from Klevu API |
| `next?` | (`override?`: { `filterManager?`: [`FilterManager`](classes/FilterManager.md) ; `limit?`: `number`  }) => `Promise`<[`KlevuFetchResponse`](modules.md#klevufetchresponse)\> | Next function is available if there are more results in the given query. It is optimized function that removes parts from query that might slow down the response and they are not needed after first request. |
| `queriesById` | (`id`: `string`) => `undefined` \| [`KlevuQueryResult`](modules.md#klevuqueryresult) & [`KlevuResultEvent`](modules.md#klevuresultevent) | Get query result by id |
| `suggestionsById` | (`id`: `string`) => `undefined` \| [`KlevuSuggestionResult`](modules.md#klevusuggestionresult) | Get suggestion by Id |

#### Defined in

[models/KlevuFetchResponse.ts:9](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuFetchResponse.ts#L9)

 Functions

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)\>

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

FunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

Modifer`

Apply filters to query based on Filter Manager

#### Parameters

| Name | Type |
| :------ | :------ |
| `manager` | [`FilterManager`](classes/FilterManager.md) |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/applyFilterWithManager/applyFilterWithManager.ts:12](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/applyFilterWithManager/applyFilterWithManager.ts#L12)

Modifer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`ApplyFilter`](modules.md#applyfilter)[] |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/applyFilter/applyFilter.ts:21](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/applyFilter/applyFilter.ts#L21)

Modifer`

Boost query with currect selection of filter manager

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `manager` | [`FilterManager`](classes/FilterManager.md) | Instance of filter manager to use for selection of current values |
| `weights` | { `key`: `string` ; `weight`: `number`  }[] | Tell the weight of each filter |

#### Returns

`KlevuFetchModifer`

KlevuModifier that be used to modify query

#### Defined in

[modifiers/boostWithFilterManager/boostWithFilterManager.ts:13](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/boostWithFilterManager/boostWithFilterManager.ts#L13)

Modifer`

Boost products based on a filters

#### Parameters

| Name | Type |
| :------ | :------ |
| `boosts` | { `key`: `string` ; `values`: `string`[] ; `weight`: `number`  }[] |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/boostWithFilters/boostWithFilters.ts:10](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/boostWithFilters/boostWithFilters.ts#L10)

Modifer`

Boost or deboost query based on a keywords.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keywords` | { `phrase`: `string` ; `weight`: `number`  }[] | Keywords to boost and deboost |

#### Returns

`KlevuFetchModifer`

KlevuModifier that be used to modify query

#### Defined in

[modifiers/boostWithKeywords/boostWithKeywords.ts:10](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/boostWithKeywords/boostWithKeywords.ts#L10)

Modifer`

Boost or deboost query based on a record ids.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `records` | { `id`: `string` ; `weight`: `number`  }[] | Keywords to boost and deboost |

#### Returns

`KlevuFetchModifer`

KlevuModifier that be used to modify query

#### Defined in

[modifiers/boostWithRecords/boostWithRecords.ts:10](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/boostWithRecords/boostWithRecords.ts#L10)

Modifer`

Prints queries to console for easier debugging

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/debug/debug.ts:9](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/debug/debug.ts#L9)

Modifer`

If original query doesn't return enough results then fallback query is run added to results

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue) |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/fallback/fallback.ts:12](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/fallback/fallback.ts#L12)

Modifer`

Force include product ids on result

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string`[] |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/include/include.ts:10](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/include/include.ts#L10)

Modifer`

Internal function to inject listFilter results back to result object when they are removed in next() function
Should not be used outside of library itself

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevQuery` | [`KlevuQueryResult`](modules.md#klevuqueryresult) |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/injectFilterResult/injectFilterResult.ts:12](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/injectFilterResult/injectFilterResult.ts#L12)

Modifer`

List filters that can affect given query

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<`Options`\> |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/listFilters/listFilters.ts:33](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/listFilters/listFilters.ts#L33)

Modifer`

Enable personlisation to the query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` |  |
| `options.fields?` | [`KlevuRecordFields`](modules.md#klevurecordfields)[] | This is an optional field. By default, Klevu will analyse all attributes of the records the customer has interacted with, in order to determine the common patterns. If you prefer to focus on particular aspects, for example brand or price, specify those attributes within this object. |
| `options.lastClickedProductIds?` | `string`[] | Override last clicked product id's with your own selection. First item should be the latest product clicked. By default @klevu/core uses internal store to keep track of last clicked products. It is important use KlevuEvent class to store all interactions. |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/personalisation/personalisation.ts:12](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/personalisation/personalisation.ts#L12)

Modifer`

This modifier should be used with merchandising query. It sends
automatically correct event data to Klevu

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `title` | `string` | Title of the category page viewed |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/sendMerchandisingViewEvent/sendMerchandisingViewEvent.ts:12](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/sendMerchandisingViewEvent/sendMerchandisingViewEvent.ts#L12)

Modifer`

This modifier should be used with all recommendation requests. It sends
correct event data to klevu backend on recommendation view

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `eventData?` | [`RecommendationViewEventMetaData`](modules.md#recommendationvieweventmetadata) |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/sendRecommendationViewEvent/sendRecommendationViewEvent.ts:24](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/sendRecommendationViewEvent/sendRecommendationViewEvent.ts#L24)

Modifer`

This modifier should be used in the case when user hits enter (or presses button) to see
all results from search.

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/sendSearchEvent/sendSearchEvent.ts:11](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/sendSearchEvent/sendSearchEvent.ts#L11)

