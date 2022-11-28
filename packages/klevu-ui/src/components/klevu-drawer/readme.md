# klevu-drawer

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description                                    | Type                   | Default     |
| --------------------- | ------------------------ | ---------------------------------------------- | ---------------------- | ----------- |
| `anchor`              | `anchor`                 | Anchor to right or left side of the page       | `"left" \| "right"`    | `"right"`   |
| `background`          | `background`             | Display dim background on top of other content | `boolean \| undefined` | `undefined` |
| `closeAtOutsideClick` | `close-at-outside-click` | Close by clicking outside of drawer            | `boolean`              | `true`      |
| `startOpen`           | `start-open`             | Start side drawer open                         | `boolean \| undefined` | `undefined` |


## Methods

### `closeModal() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `openModal() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                          |
| ----------- | ---------------------------------------------------- |
| `"content"` | Content to display in drawer                         |
| `"origin"`  | When origin element is clicked then content is shown |


## Dependencies

### Used by

 - [klevu-merchandising](../klevu-merchandising)
 - [klevu-search-landing-page](../klevu-search-landing-page)

### Graph
```mermaid
graph TD;
  klevu-merchandising --> klevu-drawer
  klevu-search-landing-page --> klevu-drawer
  style klevu-drawer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
