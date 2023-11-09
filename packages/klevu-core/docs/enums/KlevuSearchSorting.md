[@klevu/core]() / [Exports](../modules.md) / KlevuSearchSorting

# Enumeration: KlevuSearchSorting

## Table of contents

### Enumeration Members

- [AdvancedSorting](KlevuSearchSorting.md#advancedsorting)
- [NameAsc](KlevuSearchSorting.md#nameasc)
- [NameDesc](KlevuSearchSorting.md#namedesc)
- [NewArrivalAsc](KlevuSearchSorting.md#newarrivalasc)
- [NewArrivalDesc](KlevuSearchSorting.md#newarrivaldesc)
- [PriceAsc](KlevuSearchSorting.md#priceasc)
- [PriceDesc](KlevuSearchSorting.md#pricedesc)
- [RatingAsc](KlevuSearchSorting.md#ratingasc)
- [RatingDesc](KlevuSearchSorting.md#ratingdesc)
- [Relevance](KlevuSearchSorting.md#relevance)

## Enumeration Members

### AdvancedSorting

• **AdvancedSorting** = ``"ADVANCED_SORT"``

Advanced sorting method that requires list of keys to be sorted with. Recommended use `advancedSorting()` modifier instead of specifying this

#### Defined in

[models/KlevuSearchSorting.ts:49](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchSorting.ts#L49)

___

### NameAsc

• **NameAsc** = ``"NAME_ASC"``

Sort the results by the name of each record, in alphabetical order.

#### Defined in

[models/KlevuSearchSorting.ts:20](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchSorting.ts#L20)

___

### NameDesc

• **NameDesc** = ``"NAME_DESC"``

Sort the results by the name of each record, in alphabetical order.

#### Defined in

[models/KlevuSearchSorting.ts:24](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchSorting.ts#L24)

___

### NewArrivalAsc

• **NewArrivalAsc** = ``"NEW_ARRIVAL_ASC"``

Sort your records based on their published date. Please see support article
for important information about sorting by newness.

#### Defined in

[models/KlevuSearchSorting.ts:39](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchSorting.ts#L39)

___

### NewArrivalDesc

• **NewArrivalDesc** = ``"NEW_ARRIVAL_DESC"``

Sort your records based on their published date. Please see support article
for important information about sorting by newness.

#### Defined in

[models/KlevuSearchSorting.ts:44](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchSorting.ts#L44)

___

### PriceAsc

• **PriceAsc** = ``"PRICE_ASC"``

Sort the results by the salePrice value of each record.

#### Defined in

[models/KlevuSearchSorting.ts:12](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchSorting.ts#L12)

___

### PriceDesc

• **PriceDesc** = ``"PRICE_DESC"``

Sort the results by the salePrice value of each record.

#### Defined in

[models/KlevuSearchSorting.ts:16](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchSorting.ts#L16)

___

### RatingAsc

• **RatingAsc** = ``"RATING_ASC"``

Sort the results by each record's average rating, if this data has been
indexed in your store.

#### Defined in

[models/KlevuSearchSorting.ts:29](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchSorting.ts#L29)

___

### RatingDesc

• **RatingDesc** = ``"RATING_DESC"``

Sort the results by each record's average rating, if this data has been
indexed in your store.

#### Defined in

[models/KlevuSearchSorting.ts:34](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchSorting.ts#L34)

___

### Relevance

• **Relevance** = ``"RELEVANCE"``

This is the default sort order, which uses a combination of Klevu A.I. and
your own merchandising configuration to determine the order of the results.
Please read this article for more information about how Klevu ranks and
orders the results.

#### Defined in

[models/KlevuSearchSorting.ts:8](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchSorting.ts#L8)
