# klevu-search-field



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                          | Type     | Default                 |
| ------------- | ------------- | ---------------------------------------------------- | -------- | ----------------------- |
| `limit`       | `limit`       |                                                      | `number` | `10`                    |
| `placeholder` | `placeholder` | The placeholder text to display in the search field. | `string` | `"Search for products"` |


## Events

| Event               | Description | Type                         |
| ------------------- | ----------- | ---------------------------- |
| `searchClick`       |             | `CustomEvent<string>`        |
| `searchResults`     |             | `CustomEvent<KlevuRecord[]>` |
| `searchSuggestions` |             | `CustomEvent<string[]>`      |


## Dependencies

### Used by

 - [klevu-quicksearch](../klevu-quicksearch)

### Depends on

- [klevu-textfield](../klevu-textfield)
- [klevu-button](../klevu-button)

### Graph
```mermaid
graph TD;
  klevu-search-field --> klevu-textfield
  klevu-search-field --> klevu-button
  klevu-quicksearch --> klevu-search-field
  style klevu-search-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
