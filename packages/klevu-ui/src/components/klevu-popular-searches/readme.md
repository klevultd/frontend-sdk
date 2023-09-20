# klevu-popular-searches



<!-- Auto Generated Below -->


## Overview

Fetches and displays most popular searches from Klevu Merchant center

## Properties

| Property   | Attribute   | Description         | Type  | Default                                      |
| ---------- | ----------- | ------------------- | ----- | -------------------------------------------- |
| `tCaption` | `t-caption` | Caption of the list | `any` | `getTranslation("popularSearches.tCaption")` |


## Events

| Event                       | Description                                            | Type                  |
| --------------------------- | ------------------------------------------------------ | --------------------- |
| `klevuPopularSearchClicked` | Event that is emitted when a popular search is clicked | `CustomEvent<string>` |


## Dependencies

### Used by

 - [klevu-quicksearch](../klevu-quicksearch)
 - [klevu-search-landing-page](../klevu-search-landing-page)

### Depends on

- [klevu-typography](../klevu-typography)
- [klevu-list](../klevu-list)

### Graph
```mermaid
graph TD;
  klevu-popular-searches --> klevu-typography
  klevu-popular-searches --> klevu-list
  klevu-list --> klevu-icon
  klevu-list --> klevu-typography
  klevu-quicksearch --> klevu-popular-searches
  klevu-search-landing-page --> klevu-popular-searches
  style klevu-popular-searches fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
