# klevu-slider



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute       | Description | Type                   | Default     |
| ------------------ | --------------- | ----------- | ---------------------- | ----------- |
| `end`              | `end`           |             | `number \| undefined`  | `undefined` |
| `max` _(required)_ | `max`           |             | `number`               | `undefined` |
| `min` _(required)_ | `min`           |             | `number`               | `undefined` |
| `showTooltips`     | `show-tooltips` |             | `boolean \| undefined` | `undefined` |
| `start`            | `start`         |             | `number \| undefined`  | `undefined` |


## Events

| Event               | Description | Type                            |
| ------------------- | ----------- | ------------------------------- |
| `klevuSliderChange` |             | `CustomEvent<[number, number]>` |


## Dependencies

### Used by

 - [klevu-facet](../klevu-facet)

### Graph
```mermaid
graph TD;
  klevu-facet --> klevu-slider
  style klevu-slider fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
