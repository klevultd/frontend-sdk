# klevu-latest-searches

<!-- Auto Generated Below -->


## Overview

Lists latest searches user has made on the site

## Properties

| Property  | Attribute | Description         | Type     | Default           |
| --------- | --------- | ------------------- | -------- | ----------------- |
| `caption` | `caption` | Caption of the list | `string` | `"Last searches"` |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"klevu-list"` |             |


## Dependencies

### Used by

 - [klevu-quicksearch](../klevu-quicksearch)

### Depends on

- [klevu-typography](../klevu-typography)

### Graph
```mermaid
graph TD;
  klevu-latest-searches --> klevu-typography
  klevu-quicksearch --> klevu-latest-searches
  style klevu-latest-searches fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
