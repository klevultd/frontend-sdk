# klevurecord
      
Ƭ **KlevuRecord**: `Object`

#### Index signature

▪ [key: `string`]: `any`

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
| `typeOfRecord` | [`KlevuAnyTypeOfRecord`](klevuanytypeofrecord.md) | The type of record, e.g. KLEVU_PRODUCT, KLEVU_CMS, KLEVU_CATEGORY, etc. |
| `url` | `string` | The fully qualified URL used to access the record in your store. |
| `variantId?` | `string` | The identifier used at the platform level; which could be different from the unique Klevu ID, eg. the ID of the variant in the case of a configurable product. |
| `weight` | `string` | - |

#### Defined in

[models/KlevuRecord.ts:3](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuRecord.ts#L3)

