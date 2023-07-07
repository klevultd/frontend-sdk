# klevu-badge



<!-- Auto Generated Below -->


## Overview

Basic badge component. Can be used to display small information on top of other elements.

## Properties

| Property   | Attribute  | Description                      | Type                   | Default     |
| ---------- | ---------- | -------------------------------- | ---------------------- | ----------- |
| `accent`   | `accent`   | Setting a acceent color to badge | `number \| undefined`  | `undefined` |
| `closable` | `closable` |                                  | `boolean \| undefined` | `undefined` |
| `neutral`  | `neutral`  | Setting a neutral color to badge | `number \| undefined`  | `undefined` |


## Events

| Event             | Description | Type                |
| ----------------- | ----------- | ------------------- |
| `klevuBadgeClose` |             | `CustomEvent<void>` |


## Slots

| Slot        | Description   |
| ----------- | ------------- |
| `"default"` | Badge content |


## Dependencies

### Depends on

- [klevu-icon](../klevu-icon)
- [klevu-typography](../klevu-typography)

### Graph
```mermaid
graph TD;
  klevu-badge --> klevu-icon
  klevu-badge --> klevu-typography
  style klevu-badge fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


