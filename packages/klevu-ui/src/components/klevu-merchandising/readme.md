# klevu-merchandising



<!-- Auto Generated Below -->


## Overview

Full merchandising app to power up your product grid pages

## Properties

| Property                     | Attribute             | Description                                               | Type                                                                                                                                                                                                                                                                                                                                                    | Default                                     |
| ---------------------------- | --------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `category` _(required)_      | `category`            | Which category products                                   | `string`                                                                                                                                                                                                                                                                                                                                                | `undefined`                                 |
| `categoryTitle` _(required)_ | `category-title`      | Category title                                            | `string`                                                                                                                                                                                                                                                                                                                                                | `undefined`                                 |
| `filterCount`                | `filter-count`        | How many filters per facet to show                        | `number \| undefined`                                                                                                                                                                                                                                                                                                                                   | `undefined`                                 |
| `filterCustomOrder`          | --                    | Order filters in given order                              | `undefined \| { [key: string]: string[]; }`                                                                                                                                                                                                                                                                                                             | `undefined`                                 |
| `limit`                      | `limit`               | Count of products for page                                | `number`                                                                                                                                                                                                                                                                                                                                                | `24`                                        |
| `options`                    | --                    | Object to override and settings on search options         | `undefined \| { id: string; searchTerm: string; } & Omit<KlevuBaseQuerySettings, "query">`                                                                                                                                                                                                                                                              | `undefined`                                 |
| `showRatings`                | `show-ratings`        | Show ratings                                              | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                 |
| `showRatingsCount`           | `show-ratings-count`  | Show ratings count                                        | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                 |
| `sort`                       | `sort`                | Order of results                                          | `KlevuSearchSorting.AdvancedSorting \| KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance \| undefined` | `undefined`                                 |
| `sortOptions`                | --                    | Pass custom options for the sort dropdown                 | `undefined \| { value: KlevuSearchSorting; text: string; }[]`                                                                                                                                                                                                                                                                                           | `undefined`                                 |
| `tLoadMore`                  | `t-load-more`         | Text for load more button                                 | `any`                                                                                                                                                                                                                                                                                                                                                   | `getTranslation("merchandising.tLoadMore")` |
| `useABTest`                  | `use-a-b-test`        | Overrides KMC setting to use ABtest for results           | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                 |
| `useInfiniteScroll`          | `use-infinite-scroll` | Should use infinite scroll component to trigger load next | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                 |
| `usePagination`              | `use-pagination`      | Should display pagination instead of load next            | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                 |
| `usePersonalisation`         | `use-personalisation` | Enable personalisation                                    | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                 |


## Events

| Event       | Description | Type                                                                                                       |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `klevuData` |             | `CustomEvent<{ resultObject: KlevuResponseQueryObject; records: KlevuRecord[]; manager: FilterManager; }>` |


## Slots

| Slot              | Description                                     |
| ----------------- | ----------------------------------------------- |
| `"bottombanners"` | Bottom banner content                           |
| `"content"`       | Product grid items including the grid container |
| `"facets"`        | Sidebar of facets content                       |
| `"footer"`        | Footer container                                |
| `"header"`        | Header container                                |
| `"topbanners"`    | Top banner content                              |


## Dependencies

### Depends on

- [klevu-util-viewport](../klevu-util-viewport)
- [klevu-layout-results](../klevu-layout-results)
- [klevu-facet-list](../klevu-facet-list)
- [klevu-typography](../klevu-typography)
- [klevu-sort](../klevu-sort)
- [klevu-banner](../klevu-banner)
- [klevu-product-grid](../klevu-product-grid)
- [klevu-product](../klevu-product)
- [klevu-loading-indicator](../klevu-loading-indicator)
- [klevu-util-infinite-scroll](../klevu-util-infinite-scroll)
- [klevu-pagination](../klevu-pagination)
- [klevu-button](../klevu-button)

### Graph
```mermaid
graph TD;
  klevu-merchandising --> klevu-util-viewport
  klevu-merchandising --> klevu-layout-results
  klevu-merchandising --> klevu-facet-list
  klevu-merchandising --> klevu-typography
  klevu-merchandising --> klevu-sort
  klevu-merchandising --> klevu-banner
  klevu-merchandising --> klevu-product-grid
  klevu-merchandising --> klevu-product
  klevu-merchandising --> klevu-loading-indicator
  klevu-merchandising --> klevu-util-infinite-scroll
  klevu-merchandising --> klevu-pagination
  klevu-merchandising --> klevu-button
  klevu-layout-results --> klevu-util-viewport
  klevu-layout-results --> klevu-button
  klevu-layout-results --> klevu-icon
  klevu-layout-results --> klevu-drawer
  klevu-button --> klevu-icon
  klevu-button --> klevu-typography
  klevu-drawer --> klevu-util-scrollbars
  klevu-facet-list --> klevu-facet
  klevu-facet-list --> klevu-button
  klevu-facet --> klevu-accordion
  klevu-facet --> klevu-rating
  klevu-facet --> klevu-typography
  klevu-facet --> klevu-slider
  klevu-facet --> klevu-color-swatch
  klevu-facet --> klevu-checkbox
  klevu-facet --> klevu-button
  klevu-accordion --> klevu-typography
  klevu-accordion --> klevu-icon
  klevu-checkbox --> klevu-icon
  klevu-checkbox --> klevu-typography
  klevu-sort --> klevu-dropdown
  klevu-dropdown --> klevu-icon
  klevu-product --> klevu-icon
  klevu-product --> klevu-typography
  klevu-product --> klevu-button
  klevu-product --> klevu-rating
  klevu-pagination --> klevu-icon
  style klevu-merchandising fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
