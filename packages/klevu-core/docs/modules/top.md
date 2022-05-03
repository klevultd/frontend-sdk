# top
    Ids?` | { `key`: `string` ; `value`: `string`  }[] | Specify any records which should always be displayed at the top of the result set. You can specify a record id to control this at variant level, or a itemGroupId to control this at compound item level.  Note that this is only applicable when the sort order is by 'RELEVANCE'. |
| `typeOfRecords?` | [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord)[] | In addition to Products, Categories and CMS Pages, Klevu APIv2 allows you to search for custom entities.  For example if you want to display results for recipes, articles or physical stores within your search you can do so by utilising the typeOfRecords parameter. |
| `typeOfSearch?` | [`KlevuTypeOfSearch`](enums/KlevuTypeOfSearch.md) | The typeOfSearch parameter defines the behaviour when identifying matches  for a searched term. For example, whether all or just one of the entered  words must be matched, whether to allow spelling mistakes, etc. |
| `visibilityGroupID?` | `string` | A common B2B requirement is different product visibility and prices based on a customer group. With Klevu APIv2 you can specify parameters to filter out products which a particular customer should not see, and also show them specific prices if they differ from the base price.  When specifying a value for priceFieldSuffix, the following fields in your response data will be replaced with the value indexed with Klevu for the corresponding currency and group:  price, salePrice, currency  When specifying a value for visibilityGroupID, any records that do not belong to that group will be excluded from the results.  In the example to the right, the same product is indexed with data for currencies 'GBP' and 'USD'. It's visibility is set to groups 'my_group_1' and 'my_group_3', but not 'my_group_2'. |

#### Defined in

[models/KlevuBaseQuerySettings.ts:6](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuBaseQuerySettings.ts#L6)

tions

Ƭ **KlevuFilterResultOptions**: `KlevuFilterResult` & { `options`: { `count`: `number` ; `name`: `string` ; `selected`: `boolean` ; `value`: `string`  }[] ; `type`: [`Options`](enums/KlevuFilterType.md#options)  }

#### Defined in

[models/KlevuApiRawResponse.ts:30](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L30)

tions`](modules.md#klevufilterresultoptions) \| [`KlevuFilterResultSlider`](modules.md#klevufilterresultslider))[] | Currently available filters |
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

[models/KlevuApiRawResponse.ts:75](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L75)

rice` | `string` | The salePrice of the highest variant within all those indexed with the same itemGroupId. This can be used if you would like to show 'from X to Y' price range. |
| `totalVariants` | `number` | How many additional variants are available for this product. For example when searching for 'small tshirt', if a product has 3 colours available in small then the value here will be 2. If the search was 'tshirt' then the same record would return a value of 8 if there are 3 colours and 3 sizes of each available. |
| `type` | `string` | - |
| `typeOfRecord` | [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord) | The type of record, e.g. KLEVU_PRODUCT, KLEVU_CMS, KLEVU_CATEGORY, etc. |
| `url` | `string` | The fully qualified URL used to access the record in your store. |
| `weight` | `string` | - |

#### Defined in

[models/KlevuRecord.ts:3](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuRecord.ts#L3)

