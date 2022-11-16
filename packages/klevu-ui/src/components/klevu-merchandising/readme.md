# klevu-merchandising



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute        | Description                        | Type                                                                                                                                                                                                                                                                                                              | Default     |
| ---------------------------- | ---------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `category` _(required)_      | `category`       | Which category products            | `string`                                                                                                                                                                                                                                                                                                          | `undefined` |
| `categoryTitle` _(required)_ | `category-title` | Category title                     | `string`                                                                                                                                                                                                                                                                                                          | `undefined` |
| `filterCount`                | `filter-count`   | How many filters per facet to show | `number \| undefined`                                                                                                                                                                                                                                                                                             | `undefined` |
| `filterCustomOrder`          | --               | Order filters in given order       | `undefined \| { [key: string]: string[]; }`                                                                                                                                                                                                                                                                       | `undefined` |
| `limit`                      | `limit`          | Count of products for page         | `number`                                                                                                                                                                                                                                                                                                          | `24`        |
| `renderProductSlot`          | --               |                                    | `((product: KlevuRecord, productSlot: KlevuProductSlots) => string \| HTMLElement) \| undefined`                                                                                                                                                                                                                  | `undefined` |
| `sort`                       | `sort`           | Order of results                   | `KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance \| undefined` | `undefined` |


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
  klevu-merchandising --> klevu-facet-list
  klevu-merchandising --> klevu-heading
  klevu-merchandising --> klevu-drawer
  klevu-merchandising --> klevu-button
  klevu-merchandising --> klevu-product-grid
  klevu-merchandising --> klevu-product
  klevu-facet-list --> klevu-facet
  klevu-facet --> klevu-heading
  klevu-facet --> klevu-checkbox
  klevu-facet --> klevu-slider
  style klevu-merchandising fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
