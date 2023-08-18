# klevu-latest-searches

<!-- Auto Generated Below -->


## Overview

Lists latest searches user has made on the site

## Properties

| Property   | Attribute   | Description         | Type  | Default                                     |
| ---------- | ----------- | ------------------- | ----- | ------------------------------------------- |
| `tCaption` | `t-caption` | Caption of the list | `any` | `getTranslation("latestSearches.tCaption")` |


## Events

| Event                    | Description                                            | Type                  |
| ------------------------ | ------------------------------------------------------ | --------------------- |
| `klevuLastSearchClicked` | Event that is emitted when a popular search is clicked | `CustomEvent<string>` |


## Dependencies

### Used by

 - [klevu-quicksearch](../klevu-quicksearch)

### Depends on

- [klevu-typography](../klevu-typography)
- [klevu-list](../klevu-list)

### Graph
```mermaid
graph TD;
  klevu-latest-searches --> klevu-typography
  klevu-latest-searches --> klevu-list
  klevu-list --> klevu-icon
  klevu-list --> klevu-typography
  klevu-quicksearch --> klevu-latest-searches
  style klevu-latest-searches fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


