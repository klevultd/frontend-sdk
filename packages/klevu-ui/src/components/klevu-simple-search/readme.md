# klevu-simple-search

<!-- Auto Generated Below -->


## Overview

Simplified application that shows search box where typing text displays suggestions.

## Events

| Event                  | Description                              | Type                  |
| ---------------------- | ---------------------------------------- | --------------------- |
| `klevuSuggestionClick` | When any of suggestions has been clicked | `CustomEvent<string>` |


## Dependencies

### Depends on

- [klevu-popup](../klevu-popup)
- [klevu-search-field](../klevu-search-field)

### Graph
```mermaid
graph TD;
  klevu-simple-search --> klevu-popup
  klevu-simple-search --> klevu-search-field
  klevu-search-field --> klevu-textfield
  klevu-search-field --> klevu-button
  style klevu-simple-search fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
