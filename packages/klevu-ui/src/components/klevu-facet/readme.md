# klevu-facet



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute | Description | Type                                                                                                                                    | Default     |
| ---------------------- | --------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `manager` _(required)_ | --        |             | `FilterManager`                                                                                                                         | `undefined` |
| `option`               | --        |             | `KlevuFilterResult & { type: KlevuFilterType.Options; options: { name: string; value: string; count: number; selected: boolean; }[]; }` | `undefined` |
| `slider`               | --        |             | `KlevuFilterResult & { type: KlevuFilterType.Slider; min: string; max: string; start: string; end: string; }`                           | `undefined` |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"klevu-list"` |             |


## Dependencies

### Used by

 - [klevu-facet-list](../klevu-facet-list)

### Depends on

- [klevu-checkbox](../klevu-checkbox)

### Graph
```mermaid
graph TD;
  klevu-facet --> klevu-checkbox
  klevu-facet-list --> klevu-facet
  style klevu-facet fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
