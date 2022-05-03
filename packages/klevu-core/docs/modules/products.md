# products
    Query`](modules.md#klevusimilarproductsquery) \| [`KlevuTrendingProductsQuery`](modules.md#klevutrendingproductsquery) \| [`KlevuAlsoViewedQuery`](modules.md#klevualsoviewedquery)

All possible record queries that can be used with [KlevuFetch](modules.md#klevufetch) function

#### Defined in

[models/KlevuAllRecordQueries.ts:9](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuAllRecordQueries.ts#L9)

, categories, etc.) that were recently interacted with by a customer.  Please only specify one recentObject object per record type, one for all KLEVU_PRODUCT entries, another for all KLEVU_CMS pages visited, etc.  Each recentObject object may contain multiple record objects (e.g. 5 recently viewed products). The most recently clicked record should be the first element in the array. |
| `customeANDQuery?` | `string` | The custom query you would like to fire, which Klevu automatically converts into an appropriate query to be included with the request. Use a - character before the parenthesis to exclude records matching the contained condition.  This is advanced usage of our API and you may need some help with building these queries, so when you need support please reach out to us via the Community Forum. |
| `excludeIds?` | { `key`: `string` ; `value`: `string`  }[] | Use this field to exclude certain records from the search results. You can specify a record id to control this at variant level, or an itemGroupId to control this at compound level. |
| `fallbackQueryId?` | `string` | The ID of another query which should be fired if the current query yields too few results. |
| `fallbackWhenCountLessThan?` | `number` | Use this parameter to specify the criteria for when a fallback query will be fired. For example, if you would like a fallback query to fire when you have two results or less, specify a value of '3'. |
| `fields?` | [`KlevuRecordFields`](modules.md#klevurecordfields)[] |  |
| `groupBy?` | ``"id"`` \| ``"name"`` | The groupBy parameter takes the name of a field indexed in the Klevu Search backend and ensures that there is only one record for each unique value of this field in the search results.  By default, the groupBy operation is performed on the itemGroupId field. When querying for KLEVU_CATEGORY or KLEVU_CMS records, it is recommended to use name as the groupBy parameter value. |
| `includeIds?` | { `key`: `string` ; `value`: `string`  }[] | Specify any records which should be included with the results, even if the Klevu search query did not match them. You can specify a record id to control this at variant level, or a itemGroupId to control this at compound item level. |
| `limit?` | `number` | Specify the number of record you would like to display per page. |
| `offset?` | `number` | Specify the index at which to start counting the number of results from.  The index of the first record in a result set is 0. Thus, if you want to start from the 6th result, use an offset of 5. |
| `personalisation?` | { `enablePersonalisation`: ``true`` ; `fields?`: [`KlevuRecordFields`](modules.md#klevurecordfields)[]  } | When a customer enters a physical shop, they may express their preferences to an in-store assistant by highlighting the colours they like, the brands they prefer and what they have purchased before.  The in-store assistant would then use this information to show the customer products they are most likely interested in first, before showing them any others that still may be suitable.  Klevu A.I. is your online assistant.  This personalisation can be provided in two ways:  including some information about the customer's browsing history with each request defining your own boosting rules based on information you already know about the customer You can read more about how this works in our [Personalisation Guide](https://help.klevu.com/support/solutions/articles/5000871361-do-you-offer-apis-for-personalisation-). |
| `personalisation.enablePersonalisation` | ``true`` | This must be set to 'true' for enabling personalisation on a particular request. If set to 'false', the recent objects within the context object will be ignored |
| `personalisation.fields?` | [`KlevuRecordFields`](modules.md#klevurecordfields)[] | This is an optional field. By default, Klevu will analyse all attributes of the records the customer has interacted with, in order to determine the common patterns. If you prefer to focus on particular aspects, for example brand or price, specify those attributes within this object. |
| `priceFieldSuffix?` | `string` | If you have multiple currency support enabled for your store, this parameter can be used to retrieve prices for a specific currency. For example, if the data you have indexed with Klevu includes prices for a base currency GBP and an additional currency USD, a value of 'GBP' or 'USD' here will display the relevant currency values for your records. |
| `query?` | [`KlevuBaseQuerySettingsQuery`](modules.md#klevubasequerysettingsquery) | - |
| `searchPrefs?` | [`KlevuSearchPreference`](enums/KlevuSearchPreference.md)[] | There are a number of preferences available for fine-tuning your queries.  For example you can control whether or not to allow fuzzy search for  spelling mistakes on a query by query basis. The available searchPrefs  are detailed below. |
| `sort?` | [`KlevuSearchSorting`](enums/KlevuSearchSorting.md) | The default sorting of results is RELEVANCE, which uses Klevu A.I. to determine the order. There are various other options available which you can provide to your customers as required. |
| `topIds?` | { `key`: `string` ; `value`: `string`  }[] | Specify any records which should always be displayed at the top of the result set. You can specify a record id to control this at variant level, or a itemGroupId to control this at compound item level.  Note that this is only applicable when the sort order is by 'RELEVANCE'. |
| `typeOfRecords?` | [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord)[] | In addition to Products, Categories and CMS Pages, Klevu APIv2 allows you to search for custom entities.  For example if you want to display results for recipes, articles or physical stores within your search you can do so by utilising the typeOfRecords parameter. |
| `typeOfSearch?` | [`KlevuTypeOfSearch`](enums/KlevuTypeOfSearch.md) | The typeOfSearch parameter defines the behaviour when identifying matches  for a searched term. For example, whether all or just one of the entered  words must be matched, whether to allow spelling mistakes, etc. |
| `visibilityGroupID?` | `string` | A common B2B requirement is different product visibility and prices based on a customer group. With Klevu APIv2 you can specify parameters to filter out products which a particular customer should not see, and also show them specific prices if they differ from the base price.  When specifying a value for priceFieldSuffix, the following fields in your response data will be replaced with the value indexed with Klevu for the corresponding currency and group:  price, salePrice, currency  When specifying a value for visibilityGroupID, any records that do not belong to that group will be excluded from the results.  In the example to the right, the same product is indexed with data for currencies 'GBP' and 'USD'. It's visibility is set to groups 'my_group_1' and 'my_group_3', but not 'my_group_2'. |

#### Defined in

[models/KlevuBaseQuerySettings.ts:6](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuBaseQuerySettings.ts#L6)

 together, eg. the ID of the parent in the case of a configurable product. |
| `klevu_bulk_boosting` | `number` | Any manual score assigned by the manual boosting rules. This value must be either explicitly requested in fields or using Search Preference enableScores. |
| `klevu_category` | `string` | This is mostly for internal purposes, but includes the categorisation of the record within Klevu. For example KLEVU_PRODUCT;;Shop All;;Bath;;;groupid_1 @ku@kuCategory@ku@. |
| `klevu_manual_boosting` | `number` | Any manual score assigned by the merchant. This value must be either explicitly requested in fields or using Search Preference enableScores. |
| `klevu_selflearning_boosting` | `number` | The machine learning score assigned by the Klevu Search engine. This value must be either explicitly requested in fields or using Search Preference enableScores. |
| `name` | `string` | The name of your record, eg. the product name or category title. |
| `price` | `string` | The original price of your product, before any discounts. This can be used as 'was price' when used in conjunction with salePrice. |
| `rating` | `number` | The rating of your product, between 0 and 5. |
| `salePrice` | `string` | The actual selling price of your product, or 'now' price when used in conjunction with price. Note that when using filters, the sale price is represented by klevu_price. |
| `score` | `number` | The score the record has achieved, ie. how relevant it is, which is used for sorting by relevance. This value must be either explicitly requested in fields or using Search Preference enableScores. |
| `shortDesc` | `string` | The short description of your record. |
| `sku` | `string` | The Stock Keeping Unit of the record. |
| `startPrice` | `string` | The salePrice of the lowest variant within all those indexed with the same itemGroupId. This can be used if you would like to show 'as low as' price. |
| `storeBaseCurrency` | `string` | - |
| `swatches?` | { `color`: `string` ; `id`: `string` ; `image`: `string` ; `numberOfAdditionalVariants`: `string` ; `swatchImage`: `string`  }[] | If your indexed data includes variants with swatch information, this will be provided here as a nested object with the following elements |
| `swatchesInfo` | `string` | - |
| `tags` | `string` | Any tags or keywords Klevu has saved for the record. |
| `toPrice` | `string` | The salePrice of the highest variant within all those indexed with the same itemGroupId. This can be used if you would like to show 'from X to Y' price range. |
| `totalVariants` | `number` | How many additional variants are available for this product. For example when searching for 'small tshirt', if a product has 3 colours available in small then the value here will be 2. If the search was 'tshirt' then the same record would return a value of 8 if there are 3 colours and 3 sizes of each available. |
| `type` | `string` | - |
| `typeOfRecord` | [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord) | The type of record, e.g. KLEVU_PRODUCT, KLEVU_CMS, KLEVU_CATEGORY, etc. |
| `url` | `string` | The fully qualified URL used to access the record in your store. |
| `weight` | `string` | - |

#### Defined in

[models/KlevuRecord.ts:3](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuRecord.ts#L3)

Query

Ƭ **KlevuSimilarProductsQuery**: [`KlevuBaseQuery`](modules.md#klevubasequery) & { `settings`: { `context`: { `recentObjects`: { `records`: { `id`: `string`  }[] ; `typeOfRecord`: [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord)  }[]  }  } ; `typeOfRequest`: [`SimilarProducts`](enums/KlevuTypeOfRequest.md#similarproducts)  }

#### Defined in

[models/KlevuSimilarProductsQuery.ts:4](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuSimilarProductsQuery.ts#L4)

Query

Ƭ **KlevuTrendingProductsQuery**: [`KlevuBaseQuery`](modules.md#klevubasequery) & { `settings?`: { `query?`: { `categoryPath?`: `string` ; `term`: ``"*"``  }  } ; `typeOfRequest`: [`Trending`](enums/KlevuTypeOfRequest.md#trending)  }

#### Defined in

[models/KlevuTrendingProductsQuery.ts:4](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuTrendingProductsQuery.ts#L4)



• `Const` **KlevuLastClickedProducts**: `LastClickedProducts`

#### Defined in

[store/lastClickedProducts.ts:126](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/store/lastClickedProducts.ts#L126)

 for a category listing page.

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



▸ **products**(`productIds`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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



▸ **trendingProducts**(`options?`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

 based on

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



#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<`Options`\> |
| `...modifiers` | `KlevuFetchModifer`[] |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/recentlyViewedProducts/recentlyViewedProducts.ts:24](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/recentlyViewedProducts/recentlyViewedProducts.ts#L24)



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



▸ **trendingCategoryProducts**(`categoryPath`, `options?`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

 based on a filters

#### Parameters

| Name | Type |
| :------ | :------ |
| `boosts` | { `key`: `string` ; `values`: `string`[] ; `weight`: `number`  }[] |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/boostWithFilters/boostWithFilters.ts:10](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/boostWithFilters/boostWithFilters.ts#L10)

. It is important use KlevuEvent class to store all interactions. |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/personalisation/personalisation.ts:12](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/personalisation/personalisation.ts#L12)

