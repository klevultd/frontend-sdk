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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | { `amount`: `number` ; `product`: [`KlevuRecord`](../modules.md#klevurecord) ; `variantId?`: `string`  }[] | Items user bought |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:35](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/events/KlevuEvents.ts#L35)

___

### categoryMerchandisingProductClick

▸ `Static` **categoryMerchandisingProductClick**(`product`, `categoryTitle`, `klevuCategory`, `variantId?`, `productPosition?`, `abTestId?`, `abTestVariantId?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `product` | [`KlevuRecord`](../modules.md#klevurecord) | Product clicked |
| `categoryTitle` | `string` | This is the name of the category being visited. For example, Stackable Rings. The name should not include parent categories. |
| `klevuCategory` | `string` | This is the complete hierarchy of the category being visited. For example, Jewellery;Rings;Stackable Rings. Please note the use of a semicolon as the separator between a parent and a child category. |
| `variantId?` | `string` | This is the child/variant ID of the clicked product. eg. 12345. For compound products with a parent and multiple child/variant products, this is the ID of the specific variant. |
| `productPosition?` | `number` | Position of the product on the category page when it was clicked. For example, the value would be 0 if it is the first product on the first page. The value will be 30, if it is the first product on the 2nd page with 30 products being displayed per page. |
| `abTestId?` | `string` | - |
| `abTestVariantId?` | `string` | - |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:215](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/events/KlevuEvents.ts#L215)

___

### categoryMerchandisingView

▸ `Static` **categoryMerchandisingView**(`categoryTitle`, `klevuCategory`, `products`, `pageStartsFrom?`, `abTestId?`, `abTestVariantId?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `categoryTitle` | `string` | This is the name of the category being visited. For example, Stackable Rings. The name should not include parent categories. |
| `klevuCategory` | `string` | This is the complete hierarchy of the category being visited. For example, Jewellery;Rings;Stackable Rings. Please note the use of a semicolon as the separator between a parent and a child category. |
| `products` | `Pick`<[`KlevuRecord`](../modules.md#klevurecord), ``"id"``\>[] | Products in the view |
| `pageStartsFrom?` | `number` | Offset of the first product being shown on this page. For example, if you are displaying 30 products per page and if a customer is on the 2nd page, the value here should be 30. If on the 3rd page, it will be 60. |
| `abTestId?` | `string` | - |
| `abTestVariantId?` | `string` | - |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:182](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/events/KlevuEvents.ts#L182)

___

### recommendationClick

▸ `Static` **recommendationClick**(`recommendationMetadata`, `product`, `productIndexInList`): `void`

When product has been clicked in the recommendation banner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recommendationMetadata` | [`RecommendationViewEventMetaData`](../modules.md#recommendationvieweventmetadata) | Metadata of what recommendation is clicked |
| `product` | [`KlevuRecord`](../modules.md#klevurecord) | Which product is clicked in the list |
| `productIndexInList` | `number` | What is the index of the product in the list. Starting from 1 |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:99](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/events/KlevuEvents.ts#L99)

___

### recommendationView

▸ `Static` **recommendationView**(`recommendationMetadata`, `products`): `void`

When recommendation banner is shown in the page

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recommendationMetadata` | [`RecommendationViewEventMetaData`](../modules.md#recommendationvieweventmetadata) | - |
| `products` | [`KlevuRecord`](../modules.md#klevurecord)[] | List of all products that are shown |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:66](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/events/KlevuEvents.ts#L66)

___

### search

▸ `Static` **search**(`term`, `totalResults`, `typeOfSearch`): `void`

What user has last searched. This is important for Klevu to function
properly. Use `sendSearchEvent()` modifier with search query to send results

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `term` | `string` | What was searched |
| `totalResults` | `number` | Total number of results (can be found in result meta) |
| `typeOfSearch` | [`KlevuTypeOfSearch`](../enums/KlevuTypeOfSearch.md) | Type of search used (can be found in result meta) |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:161](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/events/KlevuEvents.ts#L161)

___

### searchProductClick

▸ `Static` **searchProductClick**(`product`, `searchTerm?`, `variantId?`): `void`

When product is clicked. Do not use this for recommendations

#### Parameters

| Name | Type |
| :------ | :------ |
| `product` | [`KlevuRecord`](../modules.md#klevurecord) |
| `searchTerm?` | `string` |
| `variantId?` | `string` |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:135](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/events/KlevuEvents.ts#L135)
