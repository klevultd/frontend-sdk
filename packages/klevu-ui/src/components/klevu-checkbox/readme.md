# klevu-checkbox



<!-- Auto Generated Below -->


## Overview

Checkbox component

## Properties

| Property   | Attribute  | Description          | Type                   | Default     |
| ---------- | ---------- | -------------------- | ---------------------- | ----------- |
| `checked`  | `checked`  | Is checkbox checked  | `boolean \| undefined` | `undefined` |
| `disabled` | `disabled` | Is disabled          | `boolean \| undefined` | `undefined` |
| `name`     | `name`     | Name of the checkbox | `string \| undefined`  | `undefined` |


## Events

| Event                 | Description | Type                   |
| --------------------- | ----------- | ---------------------- |
| `klevuCheckboxChange` |             | `CustomEvent<boolean>` |


## Dependencies

### Used by

 - [klevu-facet](../klevu-facet)

### Depends on

- [klevu-icon](../klevu-icon)
- [klevu-typography](../klevu-typography)

### Graph
```mermaid
graph TD;
  klevu-checkbox --> klevu-icon
  klevu-checkbox --> klevu-typography
  klevu-facet --> klevu-checkbox
  style klevu-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
