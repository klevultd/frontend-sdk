# klevubasequery
    `](modules.md#klevubasequery) \| [`KlevuSimilarProductsQuery`](modules.md#klevusimilarproductsquery) \| [`KlevuTrendingProductsQuery`](modules.md#klevutrendingproductsquery) \| [`KlevuAlsoViewedQuery`](modules.md#klevualsoviewedquery)

All possible record queries that can be used with [KlevuFetch](modules.md#klevufetch) function

#### Defined in

[models/KlevuAllRecordQueries.ts:9](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuAllRecordQueries.ts#L9)

`](modules.md#klevubasequery) & [`KlevuAlsoViewedQuery`](modules.md#klevualsoviewedquery) & { `typeOfRequest`: [`AlsoBought`](enums/KlevuTypeOfRequest.md#alsobought)  }

Backend API parameters relevat for Also Bought Recommendation query

#### Defined in

[models/KlevuAlsoBoughtQuery.ts:8](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuAlsoBoughtQuery.ts#L8)

`](modules.md#klevubasequery) & { `settings?`: { `context?`: { `recentObjects`: { `records`: { `id`: `string`  }[] ; `typeOfRecord`: [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord)  }[]  }  } ; `typeOfRequest`: [`AlsoViewed`](enums/KlevuTypeOfRequest.md#alsoviewed)  }

Klevu API query specific for Also Viewed recommendation

#### Defined in

[models/KlevuAlsoViewedQuery.ts:7](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuAlsoViewedQuery.ts#L7)



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

[models/KlevuBaseQuery.ts:11](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuBaseQuery.ts#L11)

Settings

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

[models/KlevuBaseQuerySettings.ts:6](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuBaseQuerySettings.ts#L6)

SettingsQuery

Ƭ **KlevuBaseQuerySettingsQuery**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `categoryPath?` | `string` | Specify the name of the category to retrieve results from, in the same case and format as it is indexed with Klevu.  For nested categories, use the ; character to separate the hierarchy. For example, for 'Mens > Shoes > Trainers and Sneakers' you would specify: Mens;Shoes;Trainers and Sneakers. |
| `term?` | `string` | This is the phrase to be searched. It can be any free text up-to 128 characters long. If a longer string is provided it is automatically truncated after the first 128 characters. |

#### Defined in

[models/KlevuBaseQuerySettingsQuery.ts:1](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuBaseQuerySettingsQuery.ts#L1)

`](modules.md#klevubasequery) & { `settings`: { `context`: { `recentObjects`: { `records`: { `id`: `string`  }[] ; `typeOfRecord`: [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord)  }[]  }  } ; `typeOfRequest`: [`SimilarProducts`](enums/KlevuTypeOfRequest.md#similarproducts)  }

#### Defined in

[models/KlevuSimilarProductsQuery.ts:4](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuSimilarProductsQuery.ts#L4)

`](modules.md#klevubasequery) & { `hlEndElem?`: `string` ; `hlStartElem?`: `string` ; `limit?`: `number` ; `query`: `string` ; `typeOfRequest`: [`Suggestion`](enums/KlevuTypeOfRequest.md#suggestion)  }

#### Defined in

[models/KlevuSuggestionQuery.ts:4](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuSuggestionQuery.ts#L4)

`](modules.md#klevubasequery) & { `settings?`: { `query?`: { `categoryPath?`: `string` ; `term`: ``"*"``  }  } ; `typeOfRequest`: [`Trending`](enums/KlevuTypeOfRequest.md#trending)  }

#### Defined in

[models/KlevuTrendingProductsQuery.ts:4](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuTrendingProductsQuery.ts#L4)

Settings`](modules.md#klevubasequerysettings), ``"query"``\>

Search options to modify the search query.

#### Defined in

[queries/search/search.ts:15](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/search/search.ts#L15)

## Variables

### KlevuLastClickedProducts

• `Const` **KlevuLastClickedProducts**: `LastClickedProducts`

#### Defined in

[store/lastClickedProducts.ts:126](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/store/lastClickedProducts.ts#L126)

`](modules.md#klevubasequery) |
| `...modifiers` | `KlevuFetchModifer`[] |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/raw/raw.ts:13](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/raw/raw.ts#L13)

