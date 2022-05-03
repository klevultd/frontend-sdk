# klevurecord
    Fields`](modules.md#klevurecordfields)[] |  |
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

`](modules.md#klevurecord)[] | - |

#### Defined in

[models/KlevuApiRawResponse.ts:75](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L75)



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

[models/KlevuRecord.ts:3](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuRecord.ts#L3)

Fields

Ƭ **KlevuRecordFields**: `LiteralUnion`<keyof [`KlevuRecord`](modules.md#klevurecord), `string`\>

#### Defined in

[models/KlevuRecordFields.ts:4](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuRecordFields.ts#L4)

Fields`](modules.md#klevurecordfields)[] | This is an optional field. By default, Klevu will analyse all attributes of the records the customer has interacted with, in order to determine the common patterns. If you prefer to focus on particular aspects, for example brand or price, specify those attributes within this object. |
| `options.lastClickedProductIds?` | `string`[] | Override last clicked product id's with your own selection. First item should be the latest product clicked. By default @klevu/core uses internal store to keep track of last clicked products. It is important use KlevuEvent class to store all interactions. |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/personalisation/personalisation.ts:12](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/personalisation/personalisation.ts#L12)

