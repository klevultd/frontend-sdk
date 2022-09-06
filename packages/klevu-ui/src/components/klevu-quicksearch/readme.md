# klevu-quicksearch



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description | Type                                    | Default     |
| --------------- | --------------- | ----------- | --------------------------------------- | ----------- |
| `fallbackTerm`  | `fallback-term` |             | `string`                                | `undefined` |
| `renderProduct` | --              |             | `(product: KlevuRecord) => HTMLElement` | `undefined` |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"klevu-list"` |             |


## Dependencies

### Depends on

- [klevu-popup](../klevu-popup)
- [klevu-search-field](../klevu-search-field)
- [klevu-latest-searches](../klevu-latest-searches)
- [klevu-product-grid](../klevu-product-grid)

### Graph
```mermaid
graph TD;
  klevu-quicksearch --> klevu-popup
  klevu-quicksearch --> klevu-search-field
  klevu-quicksearch --> klevu-latest-searches
  klevu-quicksearch --> klevu-product-grid
  klevu-search-field --> klevu-textfield
  klevu-search-field --> klevu-button
  klevu-product-grid --> klevu-product
  style klevu-quicksearch fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
