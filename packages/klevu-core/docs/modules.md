[@klevu/core]() / Exports

# @klevu/core

## Table of contents

### Enumerations

- [KlevuDomEvents](enums/KlevuDomEvents.md)
- [KlevuFilterOrder](enums/KlevuFilterOrder.md)
- [KlevuFilterType](enums/KlevuFilterType.md)
- [KlevuSearchPreference](enums/KlevuSearchPreference.md)
- [KlevuSearchSorting](enums/KlevuSearchSorting.md)
- [KlevuTypeOfRecord](enums/KlevuTypeOfRecord.md)
- [KlevuTypeOfRequest](enums/KlevuTypeOfRequest.md)
- [KlevuTypeOfSearch](enums/KlevuTypeOfSearch.md)

### Classes

- [FilterManager](classes/FilterManager.md)
- [KlevuConfig](classes/KlevuConfig.md)
- [KlevuEvents](classes/KlevuEvents.md)

### Type aliases

- [ApplyFilter](modules.md#applyfilter)
- [KlevuAllRecordQueries](modules.md#klevuallrecordqueries)
- [KlevuAlsoBoughtQuery](modules.md#klevualsoboughtquery)
- [KlevuAlsoViewedQuery](modules.md#klevualsoviewedquery)
- [KlevuAnyTypeOfRecord](modules.md#klevuanytypeofrecord)
- [KlevuApiRawResponse](modules.md#klevuapirawresponse)
- [KlevuApplyFilter](modules.md#klevuapplyfilter)
- [KlevuBaseQuery](modules.md#klevubasequery)
- [KlevuBaseQuerySettings](modules.md#klevubasequerysettings)
- [KlevuBaseQuerySettingsQuery](modules.md#klevubasequerysettingsquery)
- [KlevuFetchFunctionReturnValue](modules.md#klevufetchfunctionreturnvalue)
- [KlevuFetchResponse](modules.md#klevufetchresponse)
- [KlevuFilterResultOptions](modules.md#klevufilterresultoptions)
- [KlevuFilterResultSlider](modules.md#klevufilterresultslider)
- [KlevuKMCRecommendations](modules.md#klevukmcrecommendations)
- [KlevuLastSearch](modules.md#klevulastsearch)
- [KlevuListFilter](modules.md#klevulistfilter)
- [KlevuPayload](modules.md#klevupayload)
- [KlevuQueryResult](modules.md#klevuqueryresult)
- [KlevuRangeFilterSettings](modules.md#klevurangefiltersettings)
- [KlevuRecord](modules.md#klevurecord)
- [KlevuRecordFields](modules.md#klevurecordfields)
- [KlevuResultEvent](modules.md#klevuresultevent)
- [KlevuSimilarProductsQuery](modules.md#klevusimilarproductsquery)
- [KlevuSuggestionQuery](modules.md#klevusuggestionquery)
- [KlevuSuggestionResult](modules.md#klevusuggestionresult)
- [KlevuTrendingProductsQuery](modules.md#klevutrendingproductsquery)
- [SearchOptions](modules.md#searchoptions)

### Variables

- [KlevuLastSearches](modules.md#klevulastsearches)

### KlevuFetch Functions

- [KlevuFetch](modules.md#klevufetch)

### Queries Functions

- [categoryMerchandising](modules.md#categorymerchandising)
- [products](modules.md#products)
- [search](modules.md#search)
- [suggestions](modules.md#suggestions)
- [trendingProducts](modules.md#trendingproducts)

### RecommendationQuery Functions

- [boughtTogether](modules.md#boughttogether)
- [newArrivals](modules.md#newarrivals)
- [recentlyViewed](modules.md#recentlyviewed)
- [searchCategory](modules.md#searchcategory)
- [searchCms](modules.md#searchcms)
- [similarProducts](modules.md#similarproducts)
- [trendingCategoryProducts](modules.md#trendingcategoryproducts)

### Modifier Functions

- [sendSearchEvent](modules.md#sendsearchevent)

### Modifiers Functions

- [applyFilterWithManager](modules.md#applyfilterwithmanager)
- [applyFilters](modules.md#applyfilters)
- [boostWithFilterManager](modules.md#boostwithfiltermanager)
- [boostWithFilters](modules.md#boostwithfilters)
- [boostWithKeywords](modules.md#boostwithkeywords)
- [boostWithRecords](modules.md#boostwithrecords)
- [fallback](modules.md#fallback)
- [include](modules.md#include)
- [listFilters](modules.md#listfilters)
- [top](modules.md#top)

### Other Functions

- [FetchResultEvents](modules.md#fetchresultevents)
- [KlevuKMCSettings](modules.md#klevukmcsettings)
- [debug](modules.md#debug)
- [injectFilterResult](modules.md#injectfilterresult)
- [kmcRecommendation](modules.md#kmcrecommendation)
- [raw](modules.md#raw)
- [sendMerchandisingViewEvent](modules.md#sendmerchandisingviewevent)

## Type aliases

### ApplyFilter

Ƭ **ApplyFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `settings?` | { `singleSelect`: `boolean`  } |
| `settings.singleSelect` | `boolean` |
| `values` | `string`[] \| [`number`, `number`] |

#### Defined in

[modifiers/applyFilter/applyFilter.ts:5](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/applyFilter/applyFilter.ts#L5)

___

### KlevuAllRecordQueries

Ƭ **KlevuAllRecordQueries**: [`KlevuBaseQuery`](modules.md#klevubasequery) \| [`KlevuSimilarProductsQuery`](modules.md#klevusimilarproductsquery) \| [`KlevuTrendingProductsQuery`](modules.md#klevutrendingproductsquery) \| [`KlevuAlsoViewedQuery`](modules.md#klevualsoviewedquery)

All possible record queries that can be used with [KlevuFetch](modules.md#klevufetch) function

#### Defined in

[models/KlevuAllRecordQueries.ts:9](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuAllRecordQueries.ts#L9)

___

### KlevuAlsoBoughtQuery

Ƭ **KlevuAlsoBoughtQuery**: [`KlevuBaseQuery`](modules.md#klevubasequery) & [`KlevuAlsoViewedQuery`](modules.md#klevualsoviewedquery) & { `typeOfRequest`: [`AlsoBought`](enums/KlevuTypeOfRequest.md#alsobought)  }

Backend API parameters relevat for Also Bought Recommendation query

#### Defined in

[models/KlevuAlsoBoughtQuery.ts:8](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuAlsoBoughtQuery.ts#L8)

___

### KlevuAlsoViewedQuery

Ƭ **KlevuAlsoViewedQuery**: [`KlevuBaseQuery`](modules.md#klevubasequery) & { `settings?`: { `context?`: { `recentObjects`: { `records`: { `id`: `string`  }[] ; `typeOfRecord`: [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord)  }[]  }  } ; `typeOfRequest`: [`AlsoViewed`](enums/KlevuTypeOfRequest.md#alsoviewed)  }

Klevu API query specific for Also Viewed recommendation

#### Defined in

[models/KlevuAlsoViewedQuery.ts:7](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuAlsoViewedQuery.ts#L7)

___

### KlevuAnyTypeOfRecord

Ƭ **KlevuAnyTypeOfRecord**: `LiteralUnion`<`ValueOf`<typeof [`KlevuTypeOfRecord`](enums/KlevuTypeOfRecord.md)\>, `string`\>

#### Defined in

[models/KlevuTypeOfRecord.ts:9](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuTypeOfRecord.ts#L9)

___

### KlevuApiRawResponse

Ƭ **KlevuApiRawResponse**: `Object`

Raw response from Klevu API

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meta` | { `qTime`: `number` ; `responseCode`: `number`  } |
| `meta.qTime` | `number` |
| `meta.responseCode` | `number` |
| `queryResults?` | [`KlevuQueryResult`](modules.md#klevuqueryresult)[] |
| `suggestionResults?` | [`KlevuSuggestionResult`](modules.md#klevusuggestionresult)[] |

#### Defined in

[models/KlevuApiRawResponse.ts:140](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L140)

___

### KlevuApplyFilter

Ƭ **KlevuApplyFilter**: `Object`

Apply Filter type for Klevu base query

#### Type declaration

| Name | Type |
| :------ | :------ |
| `applyFilters?` | { `filters`: { `key`: `string` ; `settings?`: { `singleSelect`: `boolean`  } ; `values`: `string`[] \| [`number`, `number`]  }[]  } |
| `applyFilters.filters` | { `key`: `string` ; `settings?`: { `singleSelect`: `boolean`  } ; `values`: `string`[] \| [`number`, `number`]  }[] |

#### Defined in

[models/KlevuApplyFilter.ts:4](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuApplyFilter.ts#L4)

___

### KlevuBaseQuery

Ƭ **KlevuBaseQuery**: `Object`

Generic

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `boost?` | { `filters?`: { `key`: `string` ; `values`: `string`[] ; `weight`: `number`  }[] ; `keywords?`: { `phrase`: `string` ; `weight`: `number`  }[] ; `records?`: { `id`: `string` ; `weight`: `number`  }[]  } | If you have already built up a profile of your customer and would like to use what you know about them to promote certain results, you can use the boost object within each record query.  There are three ways the records can be boosted:  filter conditions keywords or phrases IDs of specific records For example let's say you have an online store with an area where customers can log in.  From your stores purchase history, you know that one customer is particularly interested in the brand 'KKE'.  From your analytics data, you also know the same customer also looked at the product detail page of the product with ID: '31366487375934' many times.  Finally, you have an area where customers can specify keywords of their interests, and this customer wrote 'comfortable'.  As a merchant with all of this information available, you can build up a profile about this customer. The sample to the right shows how you would convey this information to Klevu during a search.  To find out more about how boosting works with your existing merchandising rules, please read this article on How [Personalisation Works](https://help.klevu.com/support/solutions/articles/5000871357-how-does-it-work-). |
| `boost.filters?` | { `key`: `string` ; `values`: `string`[] ; `weight`: `number`  }[] | Specify filter values to apply a boosting score to. They key is the unique identifier of the attribute, eg. Color. Each of the values represents the value of that filter to boost, eg. red or blue. |
| `boost.keywords?` | { `phrase`: `string` ; `weight`: `number`  }[] | Specify keywords or phrases to apply a boosting score to, for example "comfortable". |
| `boost.records?` | { `id`: `string` ; `weight`: `number`  }[] | Specify the Klevu ID of any records to apply a boosting score to. |
| `filters?` | [`KlevuListFilter`](modules.md#klevulistfilter) & [`KlevuApplyFilter`](modules.md#klevuapplyfilter) | - |
| `id` | `string` | - |
| `isFallbackQuery?` | `boolean` | - |
| `settings?` | [`KlevuBaseQuerySettings`](modules.md#klevubasequerysettings) | - |
| `typeOfRequest` | [`KlevuTypeOfRequest`](enums/KlevuTypeOfRequest.md) | - |

#### Defined in

[models/KlevuBaseQuery.ts:11](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuBaseQuery.ts#L11)

___

### KlevuBaseQuerySettings

Ƭ **KlevuBaseQuerySettings**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | { `recentObjects`: { `records`: { `id`: `string`  }[] ; `typeOfRecord`: [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord)  }[]  } | - |
| `context.recentObjects` | { `records`: { `id`: `string`  }[] ; `typeOfRecord`: [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord)  }[] | **`todo:`** Rewrite this doc. Describe how personalisation works  Use this object to specify the records (e.g. products, categories, etc.) that were recently interacted with by a customer.  Please only specify one recentObject object per record type, one for all KLEVU_PRODUCT entries, another for all KLEVU_CMS pages visited, etc.  Each recentObject object may contain multiple record objects (e.g. 5 recently viewed products). The most recently clicked record should be the first element in the array. |
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

[models/KlevuBaseQuerySettings.ts:6](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuBaseQuerySettings.ts#L6)

___

### KlevuBaseQuerySettingsQuery

Ƭ **KlevuBaseQuerySettingsQuery**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `categoryPath?` | `string` | Specify the name of the category to retrieve results from, in the same case and format as it is indexed with Klevu.  For nested categories, use the ; character to separate the hierarchy. For example, for 'Mens > Shoes > Trainers and Sneakers' you would specify: Mens;Shoes;Trainers and Sneakers. |
| `term?` | `string` | This is the phrase to be searched. It can be any free text up-to 128 characters long. If a longer string is provided it is automatically truncated after the first 128 characters. |

#### Defined in

[models/KlevuBaseQuerySettingsQuery.ts:1](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuBaseQuerySettingsQuery.ts#L1)

___

### KlevuFetchFunctionReturnValue

Ƭ **KlevuFetchFunctionReturnValue**: `Object`

What functions passed to KlevuFetch should implement

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `configOverride?` | [`KlevuConfig`](classes/KlevuConfig.md) | Pass down the if config has been overridden. |
| `klevuFunctionId` | `KlevuFetchTypeId` | Id of function. Used only internally |
| `modifiers?` | `KlevuFetchModifer`[] | List of modifiers set for this function |
| `params?` | `any` | Anything you wish to pass down as params incoming to function |
| `queries?` | [`KlevuAllRecordQueries`](modules.md#klevuallrecordqueries)[] | What queries should KlevuFetch do to backend |
| `suggestions?` | [`KlevuSuggestionQuery`](modules.md#klevusuggestionquery)[] | What suggestions queries should do to backend |

#### Defined in

[queries/index.ts:23](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/index.ts#L23)

___

### KlevuFetchResponse

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

[models/KlevuFetchResponse.ts:9](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuFetchResponse.ts#L9)

___

### KlevuFilterResultOptions

Ƭ **KlevuFilterResultOptions**: `KlevuFilterResult` & { `options`: { `count`: `number` ; `name`: `string` ; `selected`: `boolean` ; `value`: `string`  }[] ; `type`: [`Options`](enums/KlevuFilterType.md#options)  }

#### Defined in

[models/KlevuApiRawResponse.ts:30](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L30)

___

### KlevuFilterResultSlider

Ƭ **KlevuFilterResultSlider**: `KlevuFilterResult` & { `end`: `string` ; `max`: `string` ; `min`: `string` ; `start`: `string` ; `type`: [`Slider`](enums/KlevuFilterType.md#slider)  }

#### Defined in

[models/KlevuApiRawResponse.ts:55](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L55)

___

### KlevuKMCRecommendations

Ƭ **KlevuKMCRecommendations**: `KlevuKMCHomeRecommendation` \| `KlevuKMCCategoryRecommendation` \| `KlevuKMCProductPageRecommendation` \| `KlevuKMCCheckoutRecommendation`

#### Defined in

[queries/kmcRecommendation/kmcRecommendation.ts:116](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/kmcRecommendation/kmcRecommendation.ts#L116)

___

### KlevuLastSearch

Ƭ **KlevuLastSearch**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `term` | `string` |
| `timestamp` | `number` |

#### Defined in

[store/lastSearches.ts:4](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/store/lastSearches.ts#L4)

___

### KlevuListFilter

Ƭ **KlevuListFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `filtersToReturn?` | { `enabled`: `boolean` ; `exclude?`: `string`[] ; `include?`: `string`[] ; `options`: { `limit?`: `number` ; `mincount?`: `number` ; `order`: [`KlevuFilterOrder`](enums/KlevuFilterOrder.md)  } ; `rangeFilterSettings?`: [`KlevuRangeFilterSettings`](modules.md#klevurangefiltersettings)[]  } |
| `filtersToReturn.enabled` | `boolean` |
| `filtersToReturn.exclude?` | `string`[] |
| `filtersToReturn.include?` | `string`[] |
| `filtersToReturn.options` | { `limit?`: `number` ; `mincount?`: `number` ; `order`: [`KlevuFilterOrder`](enums/KlevuFilterOrder.md)  } |
| `filtersToReturn.options.limit?` | `number` |
| `filtersToReturn.options.mincount?` | `number` |
| `filtersToReturn.options.order` | [`KlevuFilterOrder`](enums/KlevuFilterOrder.md) |
| `filtersToReturn.rangeFilterSettings?` | [`KlevuRangeFilterSettings`](modules.md#klevurangefiltersettings)[] |

#### Defined in

[models/KlevuListFilter.ts:4](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuListFilter.ts#L4)

___

### KlevuPayload

Ƭ **KlevuPayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `context` | { `apiKeys`: `string`[]  } |
| `context.apiKeys` | `string`[] |
| `recordQueries?` | [`KlevuAllRecordQueries`](modules.md#klevuallrecordqueries)[] |
| `suggestions?` | [`KlevuSuggestionQuery`](modules.md#klevusuggestionquery)[] |

#### Defined in

[models/KlevuPayload.ts:4](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuPayload.ts#L4)

___

### KlevuQueryResult

Ƭ **KlevuQueryResult**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `filters?` | ([`KlevuFilterResultOptions`](modules.md#klevufilterresultoptions) \| [`KlevuFilterResultSlider`](modules.md#klevufilterresultslider))[] | Currently available filters |
| `id` | `string` | Id used when defining query |
| `meta` | { `apiKey`: `string` ; `debuggingInformation`: `unknown` ; `isPersonalised`: `boolean` ; `noOfResults`: `number` ; `notificationCode`: `number` ; `offset`: `number` ; `qTime`: `number` ; `searchedTerm`: `string` ; `totalResultsFound`: `number` ; `typeOfSearch`: [`KlevuTypeOfSearch`](enums/KlevuTypeOfSearch.md)  } | - |
| `meta.apiKey` | `string` | Klevu API key |
| `meta.debuggingInformation` | `unknown` | Information that can be useful for debugging the query. For example, the actual query that was fired by the Klevu Search engine, inclusive of any synonyms or de-compounded words taken into consideration. |
| `meta.isPersonalised` | `boolean` | - |
| `meta.noOfResults` | `number` | The number of results requested to be returned for this query. |
| `meta.notificationCode` | `number` | This may be populated with a code if any actions were taken on the record. Possible values are: 1: Nothing to report. 2: The price of the record is using the base currency. |
| `meta.offset` | `number` | The index of the first result returned in this response. |
| `meta.qTime` | `number` | The time taken by the Klevu Search engine to fetch the response. |
| `meta.searchedTerm` | `string` | The search term submitted for this query. |
| `meta.totalResultsFound` | `number` | The total number of results found for this query. |
| `meta.typeOfSearch` | [`KlevuTypeOfSearch`](enums/KlevuTypeOfSearch.md) | The query type that was executed by Klevu to retrieve the results. |
| `records` | { `id`: `string`  } & [`KlevuRecord`](modules.md#klevurecord)[] | - |

#### Defined in

[models/KlevuApiRawResponse.ts:75](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L75)

___

### KlevuRangeFilterSettings

Ƭ **KlevuRangeFilterSettings**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | This is the identifier of your numerical attribute, eg. 'klevu_price'. |
| `minMax` | `boolean` | If set to true, the Klevu Search engine calculates the minimum and maximum values for this filter for use with a slider. |
| `rangeInterval?` | `number` | If a positive value is provided, the Klevu Search engine will calculate ranges for this value. For example a value of 100 would give ranges from 0 to 99, 100 to 299, etc. |

#### Defined in

[models/KlevuRangeFilterSettings.ts:1](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuRangeFilterSettings.ts#L1)

___

### KlevuRecord

Ƭ **KlevuRecord**: `Object`

#### Index signature

▪ [key: `string`]: `any`

Allow custom keys for records

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `brand` | `string` | The brand of the product, eg. 'Nike'. |
| `category` | `string` | A double semicolon ;; separated list of the most specific categories, not including their full path. For example if a record was in 'Mens > Shoes' and 'Mens > Tees', the value would be Shoes;;Tees. |
| `currency` | `string` | The currency code applicable to the price values being displayed. |
| `deliveryInfo` | `string` | - |
| `discount` | `string` | - |
| `freeShipping` | `string` | - |
| `groupPrices` | `string` | This field is not always populated and is mostly used in older integrations. It includes the prices of your record in format groupId:price so you can use your own frontend logic to display prices in realtime. If you are using the B2B group price search parameters described in this documentation, the price and salePrice are automatically calculated so there is no need to use this field in most cases. |
| `hideAddToCart` | `string` | - |
| `hideGroupPrices` | `string` | - |
| `id` | `string` | The unique identifier of the record within Klevu. |
| `image` | `string` | The fully qualified URL to the main image of your record. |
| `imageHover` | `string` | The fully qualified URL to the secondary image of your record. |
| `imageUrl` | `string` | The fully qualified URL to the main image of your record. |
| `inStock` | `string` | Whether or not your record is in stock, 'yes' or 'no'. |
| `itemGroupId` | `string` | The identifier used to group compound products together, eg. the ID of the parent in the case of a configurable product. |
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

[models/KlevuRecord.ts:3](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuRecord.ts#L3)

___

### KlevuRecordFields

Ƭ **KlevuRecordFields**: `LiteralUnion`<keyof [`KlevuRecord`](modules.md#klevurecord), `string`\>

#### Defined in

[models/KlevuRecordFields.ts:4](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuRecordFields.ts#L4)

___

### KlevuResultEvent

Ƭ **KlevuResultEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getCategoryMerchandisingClickSendEvent?` | () => (`productId`: `string`, `categoryTitle`: `string`, `variantId?`: `string`) => `void` |
| `getRecommendationClickSendEvent?` | () => (`productId`: `string`, `variantId?`: `string`) => `void` |
| `getSearchClickSendEvent?` | () => (`productId`: `string`, `variantId?`: `string`) => `void` |

#### Defined in

[models/KlevuResultEvent.ts:1](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuResultEvent.ts#L1)

___

### KlevuSimilarProductsQuery

Ƭ **KlevuSimilarProductsQuery**: [`KlevuBaseQuery`](modules.md#klevubasequery) & { `settings`: { `context`: { `recentObjects`: { `records`: { `id`: `string`  }[] ; `typeOfRecord`: [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord)  }[]  }  } ; `typeOfRequest`: [`SimilarProducts`](enums/KlevuTypeOfRequest.md#similarproducts)  }

#### Defined in

[models/KlevuSimilarProductsQuery.ts:4](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuSimilarProductsQuery.ts#L4)

___

### KlevuSuggestionQuery

Ƭ **KlevuSuggestionQuery**: [`KlevuBaseQuery`](modules.md#klevubasequery) & { `hlEndElem?`: `string` ; `hlStartElem?`: `string` ; `limit?`: `number` ; `query`: `string` ; `typeOfRequest`: [`Suggestion`](enums/KlevuTypeOfRequest.md#suggestion)  }

#### Defined in

[models/KlevuSuggestionQuery.ts:4](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuSuggestionQuery.ts#L4)

___

### KlevuSuggestionResult

Ƭ **KlevuSuggestionResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `suggestions` | { `suggest`: `string`  }[] |

#### Defined in

[models/KlevuSuggestionResult.ts:1](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuSuggestionResult.ts#L1)

___

### KlevuTrendingProductsQuery

Ƭ **KlevuTrendingProductsQuery**: [`KlevuBaseQuery`](modules.md#klevubasequery) & { `settings?`: { `query?`: { `categoryPath?`: `string` ; `term`: ``"*"``  }  } ; `typeOfRequest`: [`Trending`](enums/KlevuTypeOfRequest.md#trending)  }

#### Defined in

[models/KlevuTrendingProductsQuery.ts:4](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/models/KlevuTrendingProductsQuery.ts#L4)

___

### SearchOptions

Ƭ **SearchOptions**: { `id`: `string` ; `typeOfRecords`: [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord)[]  } & `Omit`<[`KlevuBaseQuerySettings`](modules.md#klevubasequerysettings), ``"query"``\>

Search options to modify the search query.

#### Defined in

[queries/search/search.ts:15](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/search/search.ts#L15)

## Variables

### KlevuLastSearches

• `Const` **KlevuLastSearches**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `get` | () => [`KlevuLastSearch`](modules.md#klevulastsearch)[] |
| `save` | (`term`: `string`) => `void` |

#### Defined in

[store/lastSearches.ts:17](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/store/lastSearches.ts#L17)

## KlevuFetch Functions

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

[connection/klevuFetch.ts:27](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/connection/klevuFetch.ts#L27)

___

## Queries Functions

### categoryMerchandising

▸ **categoryMerchandising**(`category`, `options?`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

[queries/categoryMerchandising/categoryMerchandising.ts:28](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/categoryMerchandising/categoryMerchandising.ts#L28)

___

### products

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

[queries/products/products.ts:16](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/products/products.ts#L16)

___

### search

▸ **search**(`term`, `options?`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

[queries/search/search.ts:39](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/search/search.ts#L39)

___

### suggestions

▸ **suggestions**(`term`, `options?`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

Return suggestion on given search term

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `term` | `string` | search term |
| `options?` | `Partial`<`Options`\> |  |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/suggestions/suggestions.ts:24](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/suggestions/suggestions.ts#L24)

___

### trendingProducts

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

[queries/trendingProducts/trendingProducts.ts:24](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/trendingProducts/trendingProducts.ts#L24)

___

## RecommendationQuery Functions

### boughtTogether

▸ **boughtTogether**(`productIdsInCart`, `options`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

[queries/boughtTogether/boughtTogether.ts:23](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/boughtTogether/boughtTogether.ts#L23)

___

### newArrivals

▸ **newArrivals**(`category?`, `options?`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

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

[queries/newarrivals/newarrivals.ts:21](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/newarrivals/newarrivals.ts#L21)

___

### recentlyViewed

▸ **recentlyViewed**(`options?`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

Recently viewed products

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<`Options`\> |
| `...modifiers` | `KlevuFetchModifer`[] |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/recentlyViewedProducts/recentlyViewedProducts.ts:24](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/recentlyViewedProducts/recentlyViewedProducts.ts#L24)

___

### searchCategory

▸ **searchCategory**(`term`, `options?`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

Search helper function that sets correct settings

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `term` | `string` | category to find |
| `options?` | `Partial`<[`SearchOptions`](modules.md#searchoptions)\> |  |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/searchCategory/searchCategory.ts:13](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/searchCategory/searchCategory.ts#L13)

___

### searchCms

▸ **searchCms**(`term`, `options?`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

Search helper function that sets correct settings

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `term` | `string` | cms page to find |
| `options?` | `Partial`<[`SearchOptions`](modules.md#searchoptions)\> |  |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/searchCms/searchCms.ts:13](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/searchCms/searchCms.ts#L13)

___

### similarProducts

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

[queries/similarProducts/similarProducts.ts:24](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/similarProducts/similarProducts.ts#L24)

___

### trendingCategoryProducts

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

[queries/trendingCategoryProducts/trendingCategoryProducts.ts:39](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/trendingCategoryProducts/trendingCategoryProducts.ts#L39)

___

## Modifier Functions

### sendSearchEvent

▸ **sendSearchEvent**(): `KlevuFetchModifer`

This modifier should be used in the case when user hits enter (or presses button) to see
all results from search.

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/sendSearchEvent/sendSearchEvent.ts:11](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/sendSearchEvent/sendSearchEvent.ts#L11)

___

## Modifiers Functions

### applyFilterWithManager

▸ **applyFilterWithManager**(`manager`): `KlevuFetchModifer`

Apply filters to query based on Filter Manager

#### Parameters

| Name | Type |
| :------ | :------ |
| `manager` | [`FilterManager`](classes/FilterManager.md) |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/applyFilterWithManager/applyFilterWithManager.ts:12](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/applyFilterWithManager/applyFilterWithManager.ts#L12)

___

### applyFilters

▸ **applyFilters**(`filters`): `KlevuFetchModifer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`ApplyFilter`](modules.md#applyfilter)[] |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/applyFilter/applyFilter.ts:21](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/applyFilter/applyFilter.ts#L21)

___

### boostWithFilterManager

▸ **boostWithFilterManager**(`manager`, `weights`): `KlevuFetchModifer`

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

[modifiers/boostWithFilterManager/boostWithFilterManager.ts:13](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/boostWithFilterManager/boostWithFilterManager.ts#L13)

___

### boostWithFilters

▸ **boostWithFilters**(`boosts`): `KlevuFetchModifer`

Boost products based on a filters

#### Parameters

| Name | Type |
| :------ | :------ |
| `boosts` | { `key`: `string` ; `values`: `string`[] ; `weight`: `number`  }[] |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/boostWithFilters/boostWithFilters.ts:10](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/boostWithFilters/boostWithFilters.ts#L10)

___

### boostWithKeywords

▸ **boostWithKeywords**(`keywords`): `KlevuFetchModifer`

Boost or deboost query based on a keywords.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keywords` | { `phrase`: `string` ; `weight`: `number`  }[] | Keywords to boost and deboost |

#### Returns

`KlevuFetchModifer`

KlevuModifier that be used to modify query

#### Defined in

[modifiers/boostWithKeywords/boostWithKeywords.ts:10](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/boostWithKeywords/boostWithKeywords.ts#L10)

___

### boostWithRecords

▸ **boostWithRecords**(`records`): `KlevuFetchModifer`

Boost or deboost query based on a record ids.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `records` | { `id`: `string` ; `weight`: `number`  }[] | Keywords to boost and deboost |

#### Returns

`KlevuFetchModifer`

KlevuModifier that be used to modify query

#### Defined in

[modifiers/boostWithRecords/boostWithRecords.ts:10](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/boostWithRecords/boostWithRecords.ts#L10)

___

### fallback

▸ **fallback**(`func`): `KlevuFetchModifer`

If original query doesn't return enough results then fallback query is run added to results

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue) |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/fallback/fallback.ts:12](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/fallback/fallback.ts#L12)

___

### include

▸ **include**(`ids`): `KlevuFetchModifer`

Force include product ids on result

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string`[] |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/include/include.ts:10](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/include/include.ts#L10)

___

### listFilters

▸ **listFilters**(`options?`): `KlevuFetchModifer`

List filters that can affect given query

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<`Options`\> |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/listFilters/listFilters.ts:33](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/listFilters/listFilters.ts#L33)

___

### top

▸ **top**(`ids`): `KlevuFetchModifer`

Add given ids as first items in results

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string`[] |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/top/top.ts:10](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/top/top.ts#L10)

___

## Other Functions

### FetchResultEvents

▸ **FetchResultEvents**(`object`, `func`): [`KlevuQueryResult`](modules.md#klevuqueryresult) & [`KlevuResultEvent`](modules.md#klevuresultevent)

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | [`KlevuQueryResult`](modules.md#klevuqueryresult) |
| `func` | [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue) |

#### Returns

[`KlevuQueryResult`](modules.md#klevuqueryresult) & [`KlevuResultEvent`](modules.md#klevuresultevent)

#### Defined in

[events/FetchResultEvents.ts:9](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/events/FetchResultEvents.ts#L9)

___

### KlevuKMCSettings

▸ **KlevuKMCSettings**(): `Promise`<{ `banner`: `KMCBannerRootObject` ; `maps`: `KMCMapsRootObject` ; `root`: `KMCRootObject`  }\>

#### Returns

`Promise`<{ `banner`: `KMCBannerRootObject` ; `maps`: `KMCMapsRootObject` ; `root`: `KMCRootObject`  }\>

#### Defined in

[connection/kmc.ts:9](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/connection/kmc.ts#L9)

___

### debug

▸ **debug**(): `KlevuFetchModifer`

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/debug/debug.ts:3](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/debug/debug.ts#L3)

___

### injectFilterResult

▸ **injectFilterResult**(`prevQuery`): `KlevuFetchModifer`

Internal function to inject listFilter results back to result object when they are removed in next() function
Do not expose this to library users

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevQuery` | [`KlevuQueryResult`](modules.md#klevuqueryresult) |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/injectFilterResult/injectFilterResult.ts:11](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/injectFilterResult/injectFilterResult.ts#L11)

___

### kmcRecommendation

▸ **kmcRecommendation**(`recommendationId`, `options?`, ...`modifiers`): `Promise`<[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)\>

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

[queries/kmcRecommendation/kmcRecommendation.ts:128](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/kmcRecommendation/kmcRecommendation.ts#L128)

___

### raw

▸ **raw**(`query`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

Take control and write any kind of query you wish to Klevu API. For experts only.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`KlevuBaseQuery`](modules.md#klevubasequery) |
| `...modifiers` | `KlevuFetchModifer`[] |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/raw/raw.ts:12](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/queries/raw/raw.ts#L12)

___

### sendMerchandisingViewEvent

▸ **sendMerchandisingViewEvent**(`title`): `KlevuFetchModifer`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `title` | `string` | Title of the category page viewed |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/sendMerchandisingViewEvent/sendMerchandisingViewEvent.ts:10](https://github.com/klevultd/frontend-sdk/blob/1e22b7c/packages/klevu-core/src/modifiers/sendMerchandisingViewEvent/sendMerchandisingViewEvent.ts#L10)
