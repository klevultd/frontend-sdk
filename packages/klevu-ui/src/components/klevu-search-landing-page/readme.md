# klevu-search-landing-page

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute      | Description | Type                                                                                                                                                                                                                                                                                                                                                    | Default     |
| ------------------- | -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `filterCount`       | `filter-count` |             | `number \| undefined`                                                                                                                                                                                                                                                                                                                                   | `undefined` |
| `filterCustomOrder` | --             |             | `undefined \| { [key: string]: string[]; }`                                                                                                                                                                                                                                                                                                             | `undefined` |
| `limit`             | `limit`        |             | `number`                                                                                                                                                                                                                                                                                                                                                | `24`        |
| `renderProductSlot` | --             |             | `((product: KlevuRecord, productSlot: KlevuProductSlots) => string \| HTMLElement) \| undefined`                                                                                                                                                                                                                                                        | `undefined` |
| `sort`              | `sort`         |             | `KlevuSearchSorting.AdvancedSorting \| KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance \| undefined` | `undefined` |
| `term` _(required)_ | `term`         |             | `string`                                                                                                                                                                                                                                                                                                                                                | `undefined` |


## Dependencies

### Depends on

- [klevu-facet-list](../klevu-facet-list)
- [klevu-heading](../klevu-heading)
- [klevu-drawer](../klevu-drawer)
- [klevu-button](../klevu-button)
- [klevu-product-grid](../klevu-product-grid)
- [klevu-product](../klevu-product)

### Graph
```mermaid
graph TD;
  klevu-search-landing-page --> klevu-facet-list
  klevu-search-landing-page --> klevu-heading
  klevu-search-landing-page --> klevu-drawer
  klevu-search-landing-page --> klevu-button
  klevu-search-landing-page --> klevu-product-grid
  klevu-search-landing-page --> klevu-product
  klevu-facet-list --> klevu-facet
  klevu-facet --> klevu-accordion
  klevu-facet --> klevu-heading
  klevu-facet --> klevu-slider
  klevu-facet --> klevu-checkbox
  style klevu-search-landing-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
