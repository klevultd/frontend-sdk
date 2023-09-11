# klevu-search-landing-page

<!-- Auto Generated Below -->


## Overview

Full app component for search landing page

## Properties

| Property                     | Attribute                       | Description                                                     | Type                                                                                                                                                                                                                                                                                                                                                    | Default                                            |
| ---------------------------- | ------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `filterCount`                | `filter-count`                  | How many products to display in filters                         | `number \| undefined`                                                                                                                                                                                                                                                                                                                                   | `undefined`                                        |
| `filterCustomOrder`          | --                              | Order filters in a customer order                               | `undefined \| { [key: string]: string[]; }`                                                                                                                                                                                                                                                                                                             | `undefined`                                        |
| `limit`                      | `limit`                         | How many results to display on a page                           | `number`                                                                                                                                                                                                                                                                                                                                                | `24`                                               |
| `popularProductsResultCount` | `popular-products-result-count` | How many products to show in popular products                   | `number`                                                                                                                                                                                                                                                                                                                                                | `3`                                                |
| `showFilters`                | `show-filters`                  | Show filters on results page                                    | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                        |
| `showRatings`                | `show-ratings`                  | Show ratings                                                    | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                        |
| `showRatingsCount`           | `show-ratings-count`            | Show ratings count                                              | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                        |
| `showSearch`                 | `show-search`                   | Show the quick search box at the top of the page                | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                        |
| `sort`                       | `sort`                          | In which order to set the products                              | `KlevuSearchSorting.AdvancedSorting \| KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance \| undefined` | `undefined`                                        |
| `tLoadMore`                  | `t-load-more`                   | Text of load more button                                        | `any`                                                                                                                                                                                                                                                                                                                                                   | `getTranslation("searchLandingPage.tLoadMore")`    |
| `tSearchTitle`               | `t-search-title`                | The title of the page                                           | `any`                                                                                                                                                                                                                                                                                                                                                   | `getTranslation("searchLandingPage.tSearchTitle")` |
| `term` _(required)_          | `term`                          | What term was used for search                                   | `string`                                                                                                                                                                                                                                                                                                                                                | `undefined`                                        |
| `useInfiniteScroll`          | `use-infinite-scroll`           | Should use infinite scroll component to trigger load next       | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                        |
| `useMultiSelectFilters`      | `use-multi-select-filters`      | Specify whether to show checkboxes or radio buttons for filters | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                        |
| `usePagination`              | `use-pagination`                | Use pagination instead of loading more                          | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                        |
| `usePersonalisation`         | `use-personalisation`           | Enable personalization                                          | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                        |


## Events

| Event       | Description | Type                                                                                                       |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `klevuData` |             | `CustomEvent<{ resultObject: KlevuResponseQueryObject; records: KlevuRecord[]; manager: FilterManager; }>` |


## Slots

| Slot          | Description                                     |
| ------------- | ----------------------------------------------- |
| `"content"`   | Product grid items including the grid container |
| `"facets"`    | Sidebar of facets content                       |
| `"footer"`    | Footer container                                |
| `"header"`    | Header container                                |
| `"noResults"` | Show message when no results found              |


## Dependencies

### Depends on

- [klevu-util-viewport](../klevu-util-viewport)
- [klevu-layout-results](../klevu-layout-results)
- [klevu-facet-list](../klevu-facet-list)
- [klevu-quicksearch](../klevu-quicksearch)
- [klevu-typography](../klevu-typography)
- [klevu-sort](../klevu-sort)
- [klevu-product-grid](../klevu-product-grid)
- [klevu-product](../klevu-product)
- [klevu-popular-searches](../klevu-popular-searches)
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
  klevu-search-landing-page --> klevu-quicksearch
  klevu-search-landing-page --> klevu-typography
  klevu-search-landing-page --> klevu-sort
  klevu-search-landing-page --> klevu-product-grid
  klevu-search-landing-page --> klevu-product
  klevu-search-landing-page --> klevu-popular-searches
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
  klevu-quicksearch --> klevu-util-viewport
  klevu-quicksearch --> klevu-popup
  klevu-quicksearch --> klevu-search-field
  klevu-quicksearch --> klevu-moi
  klevu-quicksearch --> klevu-suggestions-list
  klevu-quicksearch --> klevu-cms-list
  klevu-quicksearch --> klevu-typography
  klevu-quicksearch --> klevu-sort
  klevu-quicksearch --> klevu-product-grid
  klevu-quicksearch --> klevu-product
  klevu-quicksearch --> klevu-pagination
  klevu-quicksearch --> klevu-button
  klevu-quicksearch --> klevu-popular-searches
  klevu-quicksearch --> klevu-latest-searches
  klevu-quicksearch --> klevu-tab
  klevu-search-field --> klevu-textfield
  klevu-search-field --> klevu-button
  klevu-textfield --> klevu-icon
  klevu-moi --> klevu-chat-layout
  klevu-moi --> klevu-typography
  klevu-moi --> klevu-button
  klevu-moi --> klevu-chat-messages
  klevu-moi --> klevu-loading-indicator
  klevu-moi --> klevu-modal
  klevu-moi --> klevu-product
  klevu-chat-layout --> klevu-util-scrollbars
  klevu-chat-layout --> klevu-popup
  klevu-chat-layout --> klevu-button
  klevu-chat-layout --> klevu-textfield
  klevu-chat-messages --> klevu-chat-bubble
  klevu-chat-messages --> klevu-icon
  klevu-chat-messages --> klevu-typography
  klevu-chat-messages --> klevu-button
  klevu-chat-messages --> klevu-slides
  klevu-chat-messages --> klevu-product
  klevu-chat-bubble --> klevu-typography
  klevu-chat-bubble --> klevu-icon
  klevu-chat-bubble --> klevu-button
  klevu-slides --> klevu-typography
  klevu-slides --> klevu-button
  klevu-slides --> klevu-util-scrollbars
  klevu-product --> klevu-icon
  klevu-product --> klevu-typography
  klevu-product --> klevu-button
  klevu-product --> klevu-rating
  klevu-modal --> klevu-icon
  klevu-suggestions-list --> klevu-typography
  klevu-suggestions-list --> klevu-list
  klevu-list --> klevu-icon
  klevu-list --> klevu-typography
  klevu-cms-list --> klevu-typography
  klevu-cms-list --> klevu-list
  klevu-sort --> klevu-dropdown
  klevu-dropdown --> klevu-icon
  klevu-pagination --> klevu-icon
  klevu-popular-searches --> klevu-typography
  klevu-popular-searches --> klevu-list
  klevu-latest-searches --> klevu-typography
  klevu-latest-searches --> klevu-list
  klevu-tab --> klevu-typography
  style klevu-search-landing-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


