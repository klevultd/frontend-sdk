# klevu-merchandising



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute        | Description                                                            | Type                                                                                                                                                                                                                                                                                                 | Default     |
| ---------------------------- | ---------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `category` _(required)_      | `category`       | Which category products                                                | `string`                                                                                                                                                                                                                                                                                             | `undefined` |
| `categoryTitle` _(required)_ | `category-title` | Category title                                                         | `string`                                                                                                                                                                                                                                                                                             | `undefined` |
| `filterCount`                | `filter-count`   | How many filters per facet to show                                     | `number`                                                                                                                                                                                                                                                                                             | `undefined` |
| `filterCustomOrder`          | --               | Order filters in given order                                           | `{ [key: string]: string[]; }`                                                                                                                                                                                                                                                                       | `undefined` |
| `limit`                      | `limit`          | Count of products for page                                             | `number`                                                                                                                                                                                                                                                                                             | `24`        |
| `renderProduct`              | --               | Custom rendering of product. Can pass any HTML element as return value | `(product: KlevuRecord) => HTMLElement`                                                                                                                                                                                                                                                              | `undefined` |
| `sort`                       | `sort`           | Order of results                                                       | `KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance` | `undefined` |


## Dependencies

### Depends on

- [klevu-facet-list](../klevu-facet-list)
- [klevu-heading](../klevu-heading)
- [klevu-product-grid](../klevu-product-grid)
- [klevu-button](../klevu-button)

### Graph
```mermaid
graph TD;
  klevu-merchandising --> klevu-facet-list
  klevu-merchandising --> klevu-heading
  klevu-merchandising --> klevu-product-grid
  klevu-merchandising --> klevu-button
  klevu-facet-list --> klevu-facet
  klevu-facet --> klevu-checkbox
  klevu-facet --> klevu-slider
  klevu-product-grid --> klevu-product
  style klevu-merchandising fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
