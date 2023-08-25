# klevu-search-landing-page

<!-- Auto Generated Below -->


## Overview

Full app component for search landing page

## Properties

| Property            | Attribute             | Description                                               | Type                                                                                                                                                                                                                                                                                                                                                    | Default                                            |
| ------------------- | --------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `filterCount`       | `filter-count`        | How many products to display in filters                   | `number \| undefined`                                                                                                                                                                                                                                                                                                                                   | `undefined`                                        |
| `filterCustomOrder` | --                    | Order filters in a customer order                         | `undefined \| { [key: string]: string[]; }`                                                                                                                                                                                                                                                                                                             | `undefined`                                        |
| `limit`             | `limit`               | How many results to display on a page                     | `number`                                                                                                                                                                                                                                                                                                                                                | `24`                                               |
| `showRatings`       | `show-ratings`        | Show ratings                                              | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                        |
| `showRatingsCount`  | `show-ratings-count`  | Show ratings count                                        | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                        |
| `sort`              | `sort`                | In which order to set the products                        | `KlevuSearchSorting.AdvancedSorting \| KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance \| undefined` | `undefined`                                        |
| `tLoadMore`         | `t-load-more`         | Text of load more button                                  | `any`                                                                                                                                                                                                                                                                                                                                                   | `getTranslation("searchLandingPage.tLoadMore")`    |
| `tSearchTitle`      | `t-search-title`      | The title of the page                                     | `any`                                                                                                                                                                                                                                                                                                                                                   | `getTranslation("searchLandingPage.tSearchTitle")` |
| `term` _(required)_ | `term`                | What term was used for search                             | `string`                                                                                                                                                                                                                                                                                                                                                | `undefined`                                        |
| `useInfiniteScroll` | `use-infinite-scroll` | Should use infinite scroll component to trigger load next | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                        |
| `usePagination`     | `use-pagination`      | Use pagination instead of loading more                    | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                        |


## Events

| Event  | Description | Type                                                                                                       |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `data` |             | `CustomEvent<{ resultObject: KlevuResponseQueryObject; records: KlevuRecord[]; manager: FilterManager; }>` |


## Slots

| Slot        | Description                                     |
| ----------- | ----------------------------------------------- |
| `"content"` | Product grid items including the grid container |
| `"facets"`  | Sidebar of facets content                       |
| `"footer"`  | Footer container                                |
| `"header"`  | Header container                                |


## Dependencies

### Depends on

- [klevu-util-viewport](../klevu-util-viewport)
- [klevu-layout-results](../klevu-layout-results)
- [klevu-facet-list](../klevu-facet-list)
- [klevu-typography](../klevu-typography)
- [klevu-sort](../klevu-sort)
- [klevu-product-grid](../klevu-product-grid)
- [klevu-product](../klevu-product)
- [klevu-loading-indicator](../klevu-loading-indicator)
- [klevu-util-infinite-scroll](../klevu-util-infinite-scroll)
- [klevu-pagination](../klevu-pagination)
- [klevu-button](../klevu-button)

### Graph
```mermaid
graph TD;
  klevu-search-landing-page --> klevu-util-viewport
  klevu-search-landing-page --> klevu-layout-results
  klevu-search-landing-page --> klevu-facet-list
  klevu-search-landing-page --> klevu-typography
  klevu-search-landing-page --> klevu-sort
  klevu-search-landing-page --> klevu-product-grid
  klevu-search-landing-page --> klevu-product
  klevu-search-landing-page --> klevu-loading-indicator
  klevu-search-landing-page --> klevu-util-infinite-scroll
  klevu-search-landing-page --> klevu-pagination
  klevu-search-landing-page --> klevu-button
  klevu-layout-results --> klevu-util-viewport
  klevu-layout-results --> klevu-button
  klevu-layout-results --> klevu-icon
  klevu-layout-results --> klevu-drawer
  klevu-button --> klevu-icon
  klevu-button --> klevu-typography
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
  style klevu-search-landing-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


