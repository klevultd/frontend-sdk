# klevu-dropdown

<!-- Auto Generated Below -->


## Properties

| Property                | Attribute  | Description                     | Type                                 | Default     |
| ----------------------- | ---------- | ------------------------------- | ------------------------------------ | ----------- |
| `disabled`              | `disabled` | Is element disabled             | `boolean \| undefined`               | `undefined` |
| `name` _(required)_     | `name`     | Form name                       | `string`                             | `undefined` |
| `options` _(required)_  | --         | Options to display in dropdown  | `{ value: string; text: String; }[]` | `undefined` |
| `selected` _(required)_ | `selected` | Which element value is selected | `string`                             | `undefined` |


## Events

| Event                  | Description                         | Type                  |
| ---------------------- | ----------------------------------- | --------------------- |
| `klevuDropdownChanged` | When dropdown item has been changed | `CustomEvent<string>` |


## Dependencies

### Used by

 - [klevu-sort](../klevu-sort)

### Graph
```mermaid
graph TD;
  klevu-sort --> klevu-dropdown
  style klevu-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
