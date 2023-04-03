# klevu-chat-layout



<!-- Auto Generated Below -->


## Overview

Component that wraps chat elements into a layout.

## Events

| Event                        | Description                             | Type                  |
| ---------------------------- | --------------------------------------- | --------------------- |
| `klevuChatLayoutMessageSent` | Event emitted when user sends a message | `CustomEvent<string>` |


## Methods

### `scrollMainToBottom() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [klevu-moi](../klevu-moi)

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
  klevu-button --> klevu-typography
  klevu-moi --> klevu-chat-layout
  style klevu-chat-layout fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


