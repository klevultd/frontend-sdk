# klevu-facet



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute | Description                                                                   | Type                                                                                                                                                 | Default      |
| ---------------------- | --------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `customOrder`          | --        | Set predefined order for options. Unfound values are in original order in end | `string[] \| undefined`                                                                                                                              | `undefined`  |
| `manager` _(required)_ | --        | Originating filter manager which to modify                                    | `FilterManager`                                                                                                                                      | `undefined`  |
| `mode`                 | `mode`    | Which mode should facets be in                                                | `"checkbox" \| "radio"`                                                                                                                              | `"checkbox"` |
| `option`               | --        | From which options to build facet                                             | `KlevuFilterResult & { type: KlevuFilterType.Options; options: { name: string; value: string; count: number; selected: boolean; }[]; } \| undefined` | `undefined`  |
| `slider`               | --        | From which slider to build facet                                              | `KlevuFilterResult & { type: KlevuFilterType.Slider; min: string; max: string; start: string; end: string; } \| undefined`                           | `undefined`  |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"klevu-list"` |             |


## Dependencies

### Used by

 - [klevu-facet-list](../klevu-facet-list)

### Depends on

- [klevu-heading](../klevu-heading)
- [klevu-checkbox](../klevu-checkbox)
- [klevu-slider](../klevu-slider)

### Graph
```mermaid
graph TD;
  klevu-facet --> klevu-heading
  klevu-facet --> klevu-checkbox
  klevu-facet --> klevu-slider
  klevu-facet-list --> klevu-facet
  style klevu-facet fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
