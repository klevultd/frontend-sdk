# klevu-textfield

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute     | Description | Type                  | Default     |
| -------------------- | ------------- | ----------- | --------------------- | ----------- |
| `disabled`           | `disabled`    |             | `boolean`             | `false`     |
| `placeholder`        | `placeholder` |             | `string \| undefined` | `undefined` |
| `value` _(required)_ | `value`       |             | `string`              | `undefined` |


## Events

| Event              | Description | Type                  |
| ------------------ | ----------- | --------------------- |
| `klevuTextChanged` |             | `CustomEvent<string>` |
| `klevuTextFocused` |             | `CustomEvent<void>`   |


## Dependencies

### Used by

 - [klevu-search-field](../klevu-search-field)

### Graph
```mermaid
graph TD;
  klevu-search-field --> klevu-textfield
  style klevu-textfield fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
