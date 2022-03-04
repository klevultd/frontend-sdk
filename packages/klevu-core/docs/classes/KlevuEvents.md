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

[events/klevuEvents.ts:22](https://github.com/klevultd/frontend-sdk/blob/753ea2a/packages/klevu-core/src/events/klevuEvents.ts#L22)

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

[events/klevuEvents.ts:54](https://github.com/klevultd/frontend-sdk/blob/753ea2a/packages/klevu-core/src/events/klevuEvents.ts#L54)

___

### recommendationClick

▸ `Static` **recommendationClick**(): `void`

#### Returns

`void`

#### Defined in

[events/klevuEvents.ts:44](https://github.com/klevultd/frontend-sdk/blob/753ea2a/packages/klevu-core/src/events/klevuEvents.ts#L44)

___

### recommendationView

▸ `Static` **recommendationView**(): `void`

#### Returns

`void`

#### Defined in

[events/klevuEvents.ts:46](https://github.com/klevultd/frontend-sdk/blob/753ea2a/packages/klevu-core/src/events/klevuEvents.ts#L46)

___

### search

▸ `Static` **search**(`term`, `totalResults`, `typeOfSearch`): `void`

What user has last searched. This is important for Klevu to function
properly. `search()` query automatically sends this event. Use
`doNotSendEvent` option in search to disable it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `term` | `string` | What was searched |
| `totalResults` | `number` | Total number of results (can be found in result meta) |
| `typeOfSearch` | [`KlevuTypeOfSearch`](../enums/KlevuTypeOfSearch.md) | Type of search used (can be found in result meta) |

#### Returns

`void`

#### Defined in

[events/klevuEvents.ts:81](https://github.com/klevultd/frontend-sdk/blob/753ea2a/packages/klevu-core/src/events/klevuEvents.ts#L81)
