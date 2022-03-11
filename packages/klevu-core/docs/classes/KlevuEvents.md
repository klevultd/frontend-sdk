[@klevu/core]() / [Exports](../modules.md) / KlevuEvents

# Class: KlevuEvents

## Table of contents

### Constructors

- [constructor](KlevuEvents.md#constructor)

### Methods

- [buy](KlevuEvents.md#buy)
- [productClick](KlevuEvents.md#productclick)
- [recommendationClick](KlevuEvents.md#recommendationclick)
- [recommendationView](KlevuEvents.md#recommendationview)
- [search](KlevuEvents.md#search)

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

[events/KlevuEvents.ts:18](https://github.com/klevultd/frontend-sdk/blob/9bfac58/packages/klevu-core/src/events/KlevuEvents.ts#L18)

___

### productClick

▸ `Static` **productClick**(`product`, `searchTerm?`, `variantId?`): `void`

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

[events/KlevuEvents.ts:110](https://github.com/klevultd/frontend-sdk/blob/9bfac58/packages/klevu-core/src/events/KlevuEvents.ts#L110)

___

### recommendationClick

▸ `Static` **recommendationClick**(`recommendation`, `product`, `productIndexInList`): `void`

When product has been clicked in the recommendation banner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recommendation` | `KlevuRecommendationBanner` | What recommendation is clicked |
| `product` | [`KlevuRecord`](../modules.md#klevurecord) | Which product is clicked in the list |
| `productIndexInList` | `number` | What is the index of the product in the list. Starting from 1 |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:77](https://github.com/klevultd/frontend-sdk/blob/9bfac58/packages/klevu-core/src/events/KlevuEvents.ts#L77)

___

### recommendationView

▸ `Static` **recommendationView**(`recommendation`, `products`): `void`

When recommendation banner is shown in the page

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recommendation` | `KlevuRecommendationBanner` | What recommendation is shown |
| `products` | [`KlevuRecord`](../modules.md#klevurecord)[] | List of all products that are shown |

#### Returns

`void`

#### Defined in

[events/KlevuEvents.ts:46](https://github.com/klevultd/frontend-sdk/blob/9bfac58/packages/klevu-core/src/events/KlevuEvents.ts#L46)

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

[events/KlevuEvents.ts:136](https://github.com/klevultd/frontend-sdk/blob/9bfac58/packages/klevu-core/src/events/KlevuEvents.ts#L136)
