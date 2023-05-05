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
| `items` | `Object` | Items user bought |
| `items.items` | { `amount`: `number` ; `override`: `Partial`<`V1CheckedOutProductsEvent`\> ; `product`: `Partial`<[`KlevuRecord`](../modules.md#klevurecord)\> ; `variantId?`: `string`  }[] | - |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:43](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/events/KlevuEvents.ts#L43)

___

### categoryMerchandisingProductClick

▸ `Static` **categoryMerchandisingProductClick**(`product`, `categoryTitle`, `klevuCategory`, `variantId?`, `productPosition?`, `abTestId?`, `abTestVariantId?`, `activeFilters?`, `override?`): `void`

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
| `activeFilters?` | `string` | The string version of active filters applied to the query that got the products. |
| `override` | `Partial`<`KlevuV1CategoryProductsClick`\> | Ability to override any analytical keys in low level |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:313](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/events/KlevuEvents.ts#L313)

___

### categoryMerchandisingView

▸ `Static` **categoryMerchandisingView**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.abTestId?` | `string` |
| `__namedParameters.abTestVariantId?` | `string` |
| `__namedParameters.activeFilters?` | `string` |
| `__namedParameters.categoryTitle` | `string` |
| `__namedParameters.klevuCategory` | `string` |
| `__namedParameters.override?` | `Partial`<`KlevuV1CategoryProductsView`\> |
| `__namedParameters.pageStartsFrom?` | `number` |
| `__namedParameters.products` | `Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"id"``\>[] |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:268](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/events/KlevuEvents.ts#L268)

___

### recommendationClick

▸ `Static` **recommendationClick**(`__namedParameters`): `void`

When product has been clicked in the recommendation banner

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.override?` | `Partial`<`KlevuEventV2Data`\> |
| `__namedParameters.product` | `Partial`<[`KlevuRecord`](../modules.md#klevurecord)\> |
| `__namedParameters.productIndexInList` | `number` |
| `__namedParameters.recommendationMetadata` | [`RecommendationViewEventMetaData`](../modules.md#recommendationvieweventmetadata) |
| `__namedParameters.variantId?` | `string` |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:134](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/events/KlevuEvents.ts#L134)

___

### recommendationView

▸ `Static` **recommendationView**(`__namedParameters`): `void`

When recommendation banner is shown in the page

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.override?` | `Partial`<`KlevuEventV2Data`\> |
| `__namedParameters.products` | `Partial`<[`KlevuRecord`](../modules.md#klevurecord)\>[] |
| `__namedParameters.recommendationMetadata` | [`RecommendationViewEventMetaData`](../modules.md#recommendationvieweventmetadata) |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:85](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/events/KlevuEvents.ts#L85)

___

### search

▸ `Static` **search**(`__namedParameters`): `void`

What user has last searched. This is important for Klevu to function
properly. Use `sendSearchEvent()` modifier with search query to send results

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.activeFilters?` | `string` |
| `__namedParameters.override?` | `Partial`<`V1SearchEvent`\> |
| `__namedParameters.term` | `string` |
| `__namedParameters.totalResults` | `number` |
| `__namedParameters.typeOfSearch` | [`KlevuTypeOfSearch`](../enums/KlevuTypeOfSearch.md) |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:229](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/events/KlevuEvents.ts#L229)

___

### searchProductClick

▸ `Static` **searchProductClick**(`__namedParameters`): `void`

When product is clicked. Do not use this for recommendations

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.activeFilters?` | `string` |
| `__namedParameters.override?` | `Partial`<`V1ProductTrackingEvent`\> |
| `__namedParameters.product` | `Partial`<[`KlevuRecord`](../modules.md#klevurecord)\> |
| `__namedParameters.searchTerm?` | `string` |
| `__namedParameters.variantId?` | `string` |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:186](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/events/KlevuEvents.ts#L186)
