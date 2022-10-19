# klevu-search-landing-page



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute      | Description                                                            | Type                                                                                                                                                                                                                                                                                                 | Default     |
| ------------------- | -------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `filterCount`       | `filter-count` |                                                                        | `number`                                                                                                                                                                                                                                                                                             | `undefined` |
| `filterCustomOrder` | --             |                                                                        | `{ [key: string]: string[]; }`                                                                                                                                                                                                                                                                       | `undefined` |
| `limit`             | `limit`        |                                                                        | `number`                                                                                                                                                                                                                                                                                             | `24`        |
| `renderProduct`     | --             | Custom rendering of product. Can pass any HTML element as return value | `(product: KlevuRecord) => HTMLElement`                                                                                                                                                                                                                                                              | `undefined` |
| `sort`              | `sort`         |                                                                        | `KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance` | `undefined` |
| `term` _(required)_ | `term`         |                                                                        | `string`                                                                                                                                                                                                                                                                                             | `undefined` |


## Dependencies

### Depends on

- [klevu-facet-list](../klevu-facet-list)
- [klevu-heading](../klevu-heading)
- [klevu-drawer](../klevu-drawer)
- [klevu-button](../klevu-button)
- [klevu-product-grid](../klevu-product-grid)

### Graph
```mermaid
graph TD;
  klevu-search-landing-page --> klevu-facet-list
  klevu-search-landing-page --> klevu-heading
  klevu-search-landing-page --> klevu-drawer
  klevu-search-landing-page --> klevu-button
  klevu-search-landing-page --> klevu-product-grid
  klevu-facet-list --> klevu-facet
  klevu-facet --> klevu-checkbox
  klevu-facet --> klevu-slider
  klevu-product-grid --> klevu-product
  style klevu-search-landing-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
