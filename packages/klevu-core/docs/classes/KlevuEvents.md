[@klevu/core]() / [Exports](../modules.md) / KlevuEvents

# Class: KlevuEvents

## Table of contents

### Constructors

- [constructor](KlevuEvents.md#constructor)

### Methods

- [buy](KlevuEvents.md#buy)
- [categoryMerchandisingProductClick](KlevuEvents.md#categorymerchandisingproductclick)
- [categoryMerchandisingView](KlevuEvents.md#categorymerchandisingview)
- [imageBannerClick](KlevuEvents.md#imagebannerclick)
- [recommendationClick](KlevuEvents.md#recommendationclick)
- [recommendationView](KlevuEvents.md#recommendationview)
- [search](KlevuEvents.md#search)
- [searchProductClick](KlevuEvents.md#searchproductclick)

## Constructors

### constructor

• **new KlevuEvents**()

## Methods

### buy

▸ `Static` **buy**(`items`): `void`

Tell Klevu what products where bought by the user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `Object` | Items user bought |
| `items.items` | { `amount`: `number` ; `orderId?`: `string` ; `orderLineId?`: `string` ; `override?`: `Partial`<{ `currency`: `string` ; `item_group_id`: `string` ; `item_id`: `string` ; `item_name`: `string` ; `item_variant_id`: `string` ; `order_id?`: `string` ; `order_line_id?`: `string` ; `unit_price`: `number` ; `units?`: `number`  }\> ; `product`: `Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"id"``\> & `Partial`<`Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"name"`` \| ``"currency"`` \| ``"itemGroupId"`` \| ``"salePrice"``\>\> ; `variantId?`: `string`  }[] | - |
| `items.user?` | `Object` | - |
| `items.user.email?` | `string` | - |
| `items.user.ip_address?` | `string` | - |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:44](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/events/KlevuEvents.ts#L44)

___

### categoryMerchandisingProductClick

▸ `Static` **categoryMerchandisingProductClick**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `abTestId?` | `string` |
| › `abTestVariantId?` | `string` |
| › `activeFilters?` | `string` |
| › `categoryTitle` | `string` |
| › `klevuCategory` | `string` |
| › `override?` | `Partial`<`KlevuV1CategoryProductsClick`\> |
| › `product` | `Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"id"``\> & `Partial`<`Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"name"`` \| ``"itemGroupId"`` \| ``"salePrice"`` \| ``"sku"`` \| ``"url"``\>\> |
| › `productPosition?` | `number` |
| › `variantId?` | `string` |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:368](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/events/KlevuEvents.ts#L368)

___

### categoryMerchandisingView

▸ `Static` **categoryMerchandisingView**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `abTestId?` | `string` |
| › `abTestVariantId?` | `string` |
| › `activeFilters?` | `string` |
| › `categoryTitle` | `string` |
| › `klevuCategory` | `string` |
| › `override?` | `Partial`<`KlevuV1CategoryProductsView`\> |
| › `pageStartsFrom?` | `number` |
| › `products` | `Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"id"``\>[] |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:323](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/events/KlevuEvents.ts#L323)

___

### imageBannerClick

▸ `Static` **imageBannerClick**(`«destructured»`): `void`

When user clicks on the banner that is in quicksearch or on search landing page

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `bannerId` | `string` | Id of the banner |
| › `bannerName` | `string` | Name of the banner |
| › `imageUrl` | `string` | Url of the image |
| › `override` | `Partial`<`KlevuV1ImageBannerClick`\> | - |
| › `targetUrl` | `string` | Url where the user is redirected |
| › `term` | `string` | Search term used to get the results |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:423](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/events/KlevuEvents.ts#L423)

___

### recommendationClick

▸ `Static` **recommendationClick**(`«destructured»`): `void`

When product has been clicked in the recommendation banner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `bannerInfo?` | `KlevuEventV2DataStaticContent` | - |
| › `override?` | `Partial`<`KlevuRecommendationsEventV2Data`\> | - |
| › `product?` | `Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"id"``\> & `Partial`<`Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"name"`` \| ``"brand"`` \| ``"category"`` \| ``"currency"`` \| ``"itemGroupId"`` \| ``"salePrice"``\>\> | - |
| › `productIndexInList?` | `number` | - |
| › `recommendationMetadata` | `Object` | - |
| › `recommendationMetadata.action?` | ``null`` \| ``"STATIC_CONTENT"`` \| ``"HIDE_RECOMMENDATION"`` \| ``"FILTER"`` | Special cases of recommendation |
| › `recommendationMetadata.enabled` | `boolean` | - |
| › `recommendationMetadata.logic` | [`KMCRecommendationLogic`](../enums/KMCRecommendationLogic.md) | Logic used in recommendation |
| › `recommendationMetadata.maxProducts` | `number` | Amount of products to fetch |
| › `recommendationMetadata.pageType` | `KMCRecommendationPagetype` | Target page type of recommendation |
| › `recommendationMetadata.productThreshold` | `number` | - |
| › `recommendationMetadata.recsKey` | `string` | ID of the recommendation |
| › `recommendationMetadata.segmentKey` | ``null`` \| `string` | User segment key |
| › `recommendationMetadata.segmentName` | ``null`` \| `string` | User segment name |
| › `recommendationMetadata.spotKey` | `string` | ID of the spot |
| › `recommendationMetadata.spotName` | `string` | Spot name |
| › `recommendationMetadata.title` | `string` | Title of the recommendation |
| › `variantId?` | `string` | - |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:170](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/events/KlevuEvents.ts#L170)

___

### recommendationView

▸ `Static` **recommendationView**(`«destructured»`): `void`

When recommendation banner is shown in the page

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `override?` | `Partial`<`KlevuRecommendationsEventV2Data`\> |
| › `products?` | `Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"id"``\> & `Partial`<`Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"name"`` \| ``"brand"`` \| ``"category"`` \| ``"currency"`` \| ``"itemGroupId"`` \| ``"price"`` \| ``"variantId"``\>\>[] |
| › `recommendationMetadata` | `Partial`<{ `action?`: ``null`` \| ``"STATIC_CONTENT"`` \| ``"HIDE_RECOMMENDATION"`` \| ``"FILTER"`` ; `enabled`: `boolean` ; `logic`: [`KMCRecommendationLogic`](../enums/KMCRecommendationLogic.md) ; `maxProducts`: `number` ; `pageType`: `KMCRecommendationPagetype` ; `productThreshold`: `number` ; `recsKey`: `string` ; `segmentKey`: ``null`` \| `string` ; `segmentName`: ``null`` \| `string` ; `spotKey`: `string` ; `spotName`: `string` ; `title`: `string`  }\> & `Pick`<{ `action?`: ``null`` \| ``"STATIC_CONTENT"`` \| ``"HIDE_RECOMMENDATION"`` \| ``"FILTER"`` ; `enabled`: `boolean` ; `logic`: [`KMCRecommendationLogic`](../enums/KMCRecommendationLogic.md) ; `maxProducts`: `number` ; `pageType`: `KMCRecommendationPagetype` ; `productThreshold`: `number` ; `recsKey`: `string` ; `segmentKey`: ``null`` \| `string` ; `segmentName`: ``null`` \| `string` ; `spotKey`: `string` ; `spotName`: `string` ; `title`: `string`  }, ``"logic"`` \| ``"recsKey"`` \| ``"title"``\> |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:97](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/events/KlevuEvents.ts#L97)

___

### search

▸ `Static` **search**(`«destructured»`): `void`

What user has last searched. This is important for Klevu to function
properly. Use `sendSearchEvent()` modifier with search query to send results

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `activeFilters?` | `string` |
| › `override?` | `Partial`<`V1SearchEvent`\> |
| › `term` | `string` |
| › `totalResults` | `number` |
| › `typeOfSearch` | [`KlevuTypeOfSearch`](../enums/KlevuTypeOfSearch.md) |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:284](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/events/KlevuEvents.ts#L284)

___

### searchProductClick

▸ `Static` **searchProductClick**(`«destructured»`): `void`

When product is clicked. Do not use this for recommendations

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `activeFilters?` | `string` |
| › `override?` | `Partial`<`V1ProductTrackingEvent`\> |
| › `product` | `Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"id"``\> & `Partial`<`Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"name"`` \| ``"itemGroupId"`` \| ``"url"``\>\> |
| › `searchTerm?` | `string` |
| › `variantId?` | `string` |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:240](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/events/KlevuEvents.ts#L240)
