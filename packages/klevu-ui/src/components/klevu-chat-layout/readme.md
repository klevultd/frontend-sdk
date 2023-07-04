# klevu-chat-layout



<!-- Auto Generated Below -->


## Overview

Component that wraps chat elements into a layout.

## Properties

| Property      | Attribute      | Description            | Type      | Default |
| ------------- | -------------- | ---------------------- | --------- | ------- |
| `showClose`   | `show-close`   |                        | `boolean` | `false` |
| `showLoading` | `show-loading` | Show loading indicator | `boolean` | `false` |


## Events

| Event                        | Description                                    | Type                  |
| ---------------------------- | ---------------------------------------------- | --------------------- |
| `klevuChatLayoutClose`       | Event emitted when user closes the chat layout | `CustomEvent<void>`   |
| `klevuChatLayoutMessageSent` | Event emitted when user sends a message        | `CustomEvent<string>` |


## Methods

### `closePopup() => Promise<void>`

Close the popup menu

#### Returns

Type: `Promise<void>`



### `scrollMainToBottom() => Promise<void>`

Scroll current chat to bottom of page

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [klevu-moi](../klevu-moi)

### Depends on

- [klevu-typography](../klevu-typography)
- [klevu-button](../klevu-button)
- [klevu-util-scrollbars](../klevu-util-scrollbars)
- [klevu-popup](../klevu-popup)
- [klevu-textfield](../klevu-textfield)

### Graph
```mermaid
graph TD;
  klevu-chat-layout --> klevu-typography
  klevu-chat-layout --> klevu-button
  klevu-chat-layout --> klevu-util-scrollbars
  klevu-chat-layout --> klevu-popup
  klevu-chat-layout --> klevu-textfield
  klevu-button --> klevu-typography
  klevu-moi --> klevu-chat-layout
  style klevu-chat-layout fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


