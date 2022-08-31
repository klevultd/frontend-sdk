# klevu-search-landing-page



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description | Type     | Default     |
| ------------------- | --------- | ----------- | -------- | ----------- |
| `limit`             | `limit`   |             | `number` | `24`        |
| `term` _(required)_ | `term`    |             | `string` | `undefined` |


## Dependencies

### Depends on

- [klevu-facet-list](../klevu-facet-list)
- [klevu-product-grid](../klevu-product-grid)
- [klevu-button](../klevu-button)

### Graph
```mermaid
graph TD;
  klevu-search-landing-page --> klevu-facet-list
  klevu-search-landing-page --> klevu-product-grid
  klevu-search-landing-page --> klevu-button
  klevu-facet-list --> klevu-facet
  klevu-facet --> klevu-checkbox
  klevu-product-grid --> klevu-product
  style klevu-search-landing-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
