# klevu-popup



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description | Type                   | Default     |
| --------------------- | ------------------------ | ----------- | ---------------------- | ----------- |
| `anchor`              | `anchor`                 |             | `"left" \| "right"`    | `"right"`   |
| `closeAtOutsideClick` | `close-at-outside-click` |             | `boolean`              | `true`      |
| `fullwidthContent`    | `fullwidth-content`      |             | `boolean`              | `false`     |
| `openAtFocus`         | `open-at-focus`          |             | `boolean`              | `true`      |
| `startOpen`           | `start-open`             |             | `boolean \| undefined` | `undefined` |


## Methods

### `closeModal() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `openModal() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [klevu-quicksearch](../klevu-quicksearch)
 - [klevu-simple-search](../klevu-simple-search)

### Graph
```mermaid
graph TD;
  klevu-quicksearch --> klevu-popup
  klevu-simple-search --> klevu-popup
  style klevu-popup fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
