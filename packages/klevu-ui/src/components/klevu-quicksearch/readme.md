# klevu-quicksearch



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type                                    | Default     |
| ------------------ | ------------------- | ----------- | --------------------------------------- | ----------- |
| `fallbackTerm`     | `fallback-term`     |             | `string`                                | `undefined` |
| `popupAnchor`      | `popup-anchor`      |             | `"left" \| "right"`                     | `undefined` |
| `renderProduct`    | --                  |             | `(product: KlevuRecord) => HTMLElement` | `undefined` |
| `searchCategories` | `search-categories` |             | `boolean`                               | `undefined` |
| `searchCmsPages`   | `search-cms-pages`  |             | `boolean`                               | `undefined` |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"klevu-list"` |             |


## Dependencies

### Depends on

- [klevu-popup](../klevu-popup)
- [klevu-search-field](../klevu-search-field)
- [klevu-latest-searches](../klevu-latest-searches)
- [klevu-cms-list](../klevu-cms-list)
- [klevu-product-grid](../klevu-product-grid)

### Graph
```mermaid
graph TD;
  klevu-quicksearch --> klevu-popup
  klevu-quicksearch --> klevu-search-field
  klevu-quicksearch --> klevu-latest-searches
  klevu-quicksearch --> klevu-cms-list
  klevu-quicksearch --> klevu-product-grid
  klevu-search-field --> klevu-textfield
  klevu-search-field --> klevu-button
  klevu-latest-searches --> klevu-heading
  klevu-cms-list --> klevu-heading
  klevu-product-grid --> klevu-product
  style klevu-quicksearch fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
