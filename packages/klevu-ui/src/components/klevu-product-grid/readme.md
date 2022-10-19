# klevu-product-grid



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute | Description | Type                                    | Default     |
| --------------- | --------- | ----------- | --------------------------------------- | ----------- |
| `productProps`  | --        |             | `{ variant?: KlevuProductVariant; }`    | `undefined` |
| `products`      | --        |             | `KlevuRecord[]`                         | `[]`        |
| `renderProduct` | --        |             | `(product: KlevuRecord) => HTMLElement` | `undefined` |


## Dependencies

### Used by

 - [klevu-merchandising](../klevu-merchandising)
 - [klevu-quicksearch](../klevu-quicksearch)
 - [klevu-search-landing-page](../klevu-search-landing-page)

### Depends on

- [klevu-product](../klevu-product)

### Graph
```mermaid
graph TD;
  klevu-product-grid --> klevu-product
  klevu-merchandising --> klevu-product-grid
  klevu-quicksearch --> klevu-product-grid
  klevu-search-landing-page --> klevu-product-grid
  style klevu-product-grid fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
