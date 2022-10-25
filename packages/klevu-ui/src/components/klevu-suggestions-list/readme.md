# klevu-suggestions-list



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute | Description | Type       | Default                |
| -------------------------- | --------- | ----------- | ---------- | ---------------------- |
| `caption`                  | `caption` |             | `string`   | `"Search suggestions"` |
| `suggestions` _(required)_ | --        |             | `string[]` | `undefined`            |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"klevu-list"` |             |


## Dependencies

### Used by

 - [klevu-quicksearch](../klevu-quicksearch)

### Depends on

- [klevu-heading](../klevu-heading)

### Graph
```mermaid
graph TD;
  klevu-suggestions-list --> klevu-heading
  klevu-quicksearch --> klevu-suggestions-list
  style klevu-suggestions-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
