# klevu-sort

<!-- Auto Generated Below -->


## Events

| Event              | Description              | Type                                                                                                                                                                                                                                                                                                                                                    |
| ------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `klevuSortChanged` | When the sorting changes | `CustomEvent<KlevuSearchSorting.AdvancedSorting \| KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance>` |


## Dependencies

### Depends on

- [klevu-dropdown](../klevu-dropdown)

### Graph
```mermaid
graph TD;
  klevu-sort --> klevu-dropdown
  style klevu-sort fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
