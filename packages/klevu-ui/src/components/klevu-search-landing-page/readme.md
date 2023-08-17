# klevu-search-landing-page

<!-- Auto Generated Below -->


## Overview

Full app component for search landing page

## Properties

| Property            | Attribute        | Description                                                                                                                                                                                                                                                                                       | Type                                                                                                                                                                                                                                                                                                                                                    | Default     |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `filterCount`       | `filter-count`   | How many products to display in filters                                                                                                                                                                                                                                                           | `number \| undefined`                                                                                                                                                                                                                                                                                                                                   | `undefined` |
| `filterCustomOrder` | --               | Order filters in a customer order                                                                                                                                                                                                                                                                 | `undefined \| { [key: string]: string[]; }`                                                                                                                                                                                                                                                                                                             | `undefined` |
| `limit`             | `limit`          | How many results to display on a page                                                                                                                                                                                                                                                             | `number`                                                                                                                                                                                                                                                                                                                                                | `24`        |
| `renderProductSlot` | --               | Rendering function created to put custom content to klevu-product slots. Provides a product being rendered. This function is called for each slot (top, image, info and bottom) of the component. Second parameter provides slot requested. Return null for slots that you do not want to render. | `((product: KlevuRecord, productSlot: KlevuProductSlots) => string \| HTMLElement \| null) \| undefined`                                                                                                                                                                                                                                                | `undefined` |
| `sort`              | `sort`           | In which order to set the products                                                                                                                                                                                                                                                                | `KlevuSearchSorting.AdvancedSorting \| KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance \| undefined` | `undefined` |
| `term` _(required)_ | `term`           | What term was used for search                                                                                                                                                                                                                                                                     | `string`                                                                                                                                                                                                                                                                                                                                                | `undefined` |
| `usePagination`     | `use-pagination` | Use pagination instead of loading more                                                                                                                                                                                                                                                            | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined` |


## Dependencies

### Depends on

- [klevu-util-viewport](../klevu-util-viewport)
- [klevu-layout-results](../klevu-layout-results)
- [klevu-facet-list](../klevu-facet-list)
- [klevu-typography](../klevu-typography)
- [klevu-sort](../klevu-sort)
- [klevu-product-grid](../klevu-product-grid)
- [klevu-product](../klevu-product)
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
  klevu-pagination --> klevu-icon
  style klevu-search-landing-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


