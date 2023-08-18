# klevu-sort

<!-- Auto Generated Below -->


## Overview

Sort dropdown. User can select what kind of sorting they want

## Properties

| Property  | Attribute | Description                               | Type                                             | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------- | --------- | ----------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options` | --        | Pass custom options for the sort dropdown | `{ value: KlevuSearchSorting; text: string; }[]` | `[     { value: KlevuSearchSorting.Relevance, text: getTranslation("sort.tRelevance") },     { value: KlevuSearchSorting.NameAsc, text: getTranslation("sort.tNameAsc") },     { value: KlevuSearchSorting.NameDesc, text: getTranslation("sort.tNameDesc") },     { value: KlevuSearchSorting.NewArrivalAsc, text: getTranslation("sort.tNewArrivalsAsc") },     { value: KlevuSearchSorting.NewArrivalDesc, text: getTranslation("sort.tNewArrivalsDesc") },     { value: KlevuSearchSorting.PriceAsc, text: getTranslation("sort.tPriceAsc") },     { value: KlevuSearchSorting.PriceDesc, text: getTranslation("sort.tPriceDesc") },     { value: KlevuSearchSorting.RatingAsc, text: getTranslation("sort.tRatingAsc") },     { value: KlevuSearchSorting.RatingDesc, text: getTranslation("sort.tRatingDesc") },   ]` |
| `variant` | `variant` | Dropdown variant                          | `"default" \| "inline"`                          | `"default"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |


## Events

| Event              | Description              | Type                                                                                                                                                                                                                                                                                                                                                    |
| ------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `klevuSortChanged` | When the sorting changes | `CustomEvent<KlevuSearchSorting.AdvancedSorting \| KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance>` |


## Dependencies

### Used by

 - [klevu-merchandising](../klevu-merchandising)
 - [klevu-quicksearch](../klevu-quicksearch)
 - [klevu-search-landing-page](../klevu-search-landing-page)

### Depends on

- [klevu-dropdown](../klevu-dropdown)

### Graph
```mermaid
graph TD;
  klevu-sort --> klevu-dropdown
  klevu-dropdown --> klevu-icon
  klevu-merchandising --> klevu-sort
  klevu-quicksearch --> klevu-sort
  klevu-search-landing-page --> klevu-sort
  style klevu-sort fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


