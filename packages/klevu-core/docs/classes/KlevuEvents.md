[@klevu/core]() / [Exports](../modules.md) / KlevuEvents

# Class: KlevuEvents

## Table of contents

### Constructors

- [constructor](KlevuEvents.md#constructor)

### Methods

- [buy](KlevuEvents.md#buy)
- [categoryMerchandisingProductClick](KlevuEvents.md#categorymerchandisingproductclick)
- [categoryMerchandisingView](KlevuEvents.md#categorymerchandisingview)
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

**`Property`**

count of bought products

**`Property`**

KlevuProduct that is being bought

**`Property`**

optional variantId that is being bought

**`Property`**

optional override any settings of sent data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | { `amount`: `number` ; `override`: `Partial`<`V1CheckedOutProductsEvent`\> ; `product`: `Partial`<[`KlevuRecord`](../modules.md#klevurecord)\> ; `variantId?`: `string`  }[] | Items user bought |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:43](https://github.com/klevultd/frontend-sdk/blob/58d63d7/packages/klevu-core/src/events/KlevuEvents.ts#L43)

___

### categoryMerchandisingProductClick

▸ `Static` **categoryMerchandisingProductClick**(`product`, `categoryTitle`, `klevuCategory`, `variantId?`, `productPosition?`, `abTestId?`, `abTestVariantId?`, `override?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `product` | `Partial`<[`KlevuRecord`](../modules.md#klevurecord)\> | Product clicked |
| `categoryTitle` | `string` | This is the name of the category being visited. For example, Stackable Rings. The name should not include parent categories. |
| `klevuCategory` | `string` | This is the complete hierarchy of the category being visited. For example, Jewellery;Rings;Stackable Rings. Please note the use of a semicolon as the separator between a parent and a child category. |
| `variantId?` | `string` | This is the child/variant ID of the clicked product. eg. 12345. For compound products with a parent and multiple child/variant products, this is the ID of the specific variant. |
| `productPosition?` | `number` | Position of the product on the category page when it was clicked. For example, the value would be 0 if it is the first product on the first page. The value will be 30, if it is the first product on the 2nd page with 30 products being displayed per page. |
| `abTestId?` | `string` | - |
| `abTestVariantId?` | `string` | - |
| `override` | `Partial`<`KlevuV1CategoryProductsClick`\> | Ability to override any analytical keys in low level |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:276](https://github.com/klevultd/frontend-sdk/blob/58d63d7/packages/klevu-core/src/events/KlevuEvents.ts#L276)

___

### categoryMerchandisingView

▸ `Static` **categoryMerchandisingView**(`categoryTitle`, `klevuCategory`, `products`, `pageStartsFrom?`, `abTestId?`, `abTestVariantId?`, `override?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `categoryTitle` | `string` | This is the name of the category being visited. For example, Stackable Rings. The name should not include parent categories. |
| `klevuCategory` | `string` | This is the complete hierarchy of the category being visited. For example, Jewellery;Rings;Stackable Rings. Please note the use of a semicolon as the separator between a parent and a child category. |
| `products` | `Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"id"``\>[] | Products in the view |
| `pageStartsFrom?` | `number` | Offset of the first product being shown on this page. For example, if you are displaying 30 products per page and if a customer is on the 2nd page, the value here should be 30. If on the 3rd page, it will be 60. |
| `abTestId?` | `string` | The AB test id currently running |
| `abTestVariantId?` | `string` | Id of AB test variant |
| `override` | `Partial`<`KlevuV1CategoryProductsView`\> | Ability to override any analytical keys in low level |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:238](https://github.com/klevultd/frontend-sdk/blob/58d63d7/packages/klevu-core/src/events/KlevuEvents.ts#L238)

___

### recommendationClick

▸ `Static` **recommendationClick**(`recommendationMetadata`, `product`, `productIndexInList`, `variantId?`, `override?`): `void`

When product has been clicked in the recommendation banner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recommendationMetadata` | [`RecommendationViewEventMetaData`](../modules.md#recommendationvieweventmetadata) | Metadata of what recommendation is clicked |
| `product` | `Partial`<[`KlevuRecord`](../modules.md#klevurecord)\> | Which product is clicked in the list |
| `productIndexInList` | `number` | What is the index of the product in the list. Starting from 1 |
| `variantId?` | `string` | - |
| `override` | `Partial`<`KlevuEventV2Data`\> | Ability to override any analytical keys in low level |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:128](https://github.com/klevultd/frontend-sdk/blob/58d63d7/packages/klevu-core/src/events/KlevuEvents.ts#L128)

___

### recommendationView

▸ `Static` **recommendationView**(`recommendationMetadata`, `products`, `override?`): `void`

When recommendation banner is shown in the page

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recommendationMetadata` | [`RecommendationViewEventMetaData`](../modules.md#recommendationvieweventmetadata) | - |
| `products` | `Partial`<[`KlevuRecord`](../modules.md#klevurecord)\>[] | List of all products that are shown |
| `override` | `Partial`<`KlevuEventV2Data`\> | Ability to override any analytical keys in low level |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:83](https://github.com/klevultd/frontend-sdk/blob/58d63d7/packages/klevu-core/src/events/KlevuEvents.ts#L83)

___

### search

▸ `Static` **search**(`term`, `totalResults`, `typeOfSearch`, `override?`): `void`

What user has last searched. This is important for Klevu to function
properly. Use `sendSearchEvent()` modifier with search query to send results

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `term` | `string` | What was searched |
| `totalResults` | `number` | Total number of results (can be found in result meta) |
| `typeOfSearch` | [`KlevuTypeOfSearch`](../enums/KlevuTypeOfSearch.md) | Type of search used (can be found in result meta) |
| `override` | `Partial`<`V1SearchEvent`\> | Ability to override any analytical keys in low level |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:209](https://github.com/klevultd/frontend-sdk/blob/58d63d7/packages/klevu-core/src/events/KlevuEvents.ts#L209)

___

### searchProductClick

▸ `Static` **searchProductClick**(`product`, `searchTerm?`, `variantId?`, `override?`): `void`

When product is clicked. Do not use this for recommendations

#### Parameters

| Name | Type |
| :------ | :------ |
| `product` | `Partial`<[`KlevuRecord`](../modules.md#klevurecord)\> |
| `searchTerm?` | `string` |
| `variantId?` | `string` |
| `override` | `Partial`<`V1ProductTrackingEvent`\> |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:174](https://github.com/klevultd/frontend-sdk/blob/58d63d7/packages/klevu-core/src/events/KlevuEvents.ts#L174)
