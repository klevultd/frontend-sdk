# klevu-merchandising



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute        | Description | Type                                    | Default     |
| ---------------------------- | ---------------- | ----------- | --------------------------------------- | ----------- |
| `category` _(required)_      | `category`       |             | `string`                                | `undefined` |
| `categoryTitle` _(required)_ | `category-title` |             | `string`                                | `undefined` |
| `limit`                      | `limit`          |             | `number`                                | `24`        |
| `renderProduct`              | --               |             | `(product: KlevuRecord) => HTMLElement` | `undefined` |


## Dependencies

### Depends on

- [klevu-facet-list](../klevu-facet-list)
- [klevu-product-grid](../klevu-product-grid)
- [klevu-button](../klevu-button)

### Graph
```mermaid
graph TD;
  klevu-merchandising --> klevu-facet-list
  klevu-merchandising --> klevu-product-grid
  klevu-merchandising --> klevu-button
  klevu-facet-list --> klevu-facet
  klevu-facet --> klevu-checkbox
  klevu-product-grid --> klevu-product
  style klevu-merchandising fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
