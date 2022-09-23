# klevu-facet-list



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute | Description                                                    | Type                                                          | Default     |
| ---------------------- | --------- | -------------------------------------------------------------- | ------------------------------------------------------------- | ----------- |
| `customOrder`          | --        | Custom order keys for every facet                              | `{ [key: string]: string[]; }`                                | `undefined` |
| `manager` _(required)_ | --        | Filter managet from which the list is built from               | `FilterManager`                                               | `undefined` |
| `mode`                 | `mode`    | Set mode for facets or if object is passed then define per key | `"checkbox" \| "radio" \| { [key: string]: KlevuFacetMode; }` | `undefined` |


## Dependencies

### Used by

 - [klevu-merchandising](../klevu-merchandising)
 - [klevu-search-landing-page](../klevu-search-landing-page)

### Depends on

- [klevu-facet](../klevu-facet)

### Graph
```mermaid
graph TD;
  klevu-facet-list --> klevu-facet
  klevu-facet --> klevu-checkbox
  klevu-facet --> klevu-slider
  klevu-merchandising --> klevu-facet-list
  klevu-search-landing-page --> klevu-facet-list
  style klevu-facet-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*