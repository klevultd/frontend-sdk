# klevu-chat-layout



<!-- Auto Generated Below -->


## Overview

Component that wraps chat elements into a layout.

## Properties

| Property                      | Attribute      | Description            | Type                       | Default     |
| ----------------------------- | -------------- | ---------------------- | -------------------------- | ----------- |
| `elementForHeightCalculation` | --             |                        | `HTMLElement \| undefined` | `undefined` |
| `showLoading`                 | `show-loading` | Show loading indicator | `boolean`                  | `false`     |


## Events

| Event                        | Description                             | Type                  |
| ---------------------------- | --------------------------------------- | --------------------- |
| `klevuChatLayoutMessageSent` | Event emitted when user sends a message | `CustomEvent<string>` |


## Methods

### `closePopup() => Promise<void>`

Close the popup menu

#### Returns

Type: `Promise<void>`



### `scrollMainToBottom(behavior?: "smooth" | "instant") => Promise<void>`

Scroll current chat to bottom of page

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `"actions"` | Actions to be placed in the footer                                                                               |
| `"default"` | Main content of the chat layout. Only one element should be used for this slot to make layout calculatios right. |
| `"footer"`  | Footer of the chat layout                                                                                        |
| `"header"`  | Header of the chat layout                                                                                        |


## Dependencies

### Used by

 - [klevu-moi](../klevu-moi)
 - [klevu-product-query-popup](../klevu-product-query-popup)

### Depends on

- [klevu-util-scrollbars](../klevu-util-scrollbars)
- [klevu-popup](../klevu-popup)
- [klevu-button](../klevu-button)
- [klevu-textfield](../klevu-textfield)

### Graph
```mermaid
graph TD;
  klevu-chat-layout --> klevu-util-scrollbars
  klevu-chat-layout --> klevu-popup
  klevu-chat-layout --> klevu-button
  klevu-chat-layout --> klevu-textfield
  klevu-button --> klevu-icon
  klevu-button --> klevu-typography
  klevu-textfield --> klevu-icon
  klevu-moi --> klevu-chat-layout
  klevu-product-query-popup --> klevu-chat-layout
  style klevu-chat-layout fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
