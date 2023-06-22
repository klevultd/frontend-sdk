# klevu-product-query



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default |
| -------- | --------- | ----------- | -------- | ------- |
| `url`    | `url`     |             | `string` | `""`    |


## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"material-icon"` |             |


## Dependencies

### Depends on

- [klevu-button](../klevu-button)
- [klevu-modal](../klevu-modal)
- [klevu-typography](../klevu-typography)
- [klevu-chat-layout](../klevu-chat-layout)
- [klevu-chat-messages](../klevu-chat-messages)
- [klevu-loading-indicator](../klevu-loading-indicator)
- [klevu-textfield](../klevu-textfield)

### Graph
```mermaid
graph TD;
  klevu-product-query --> klevu-button
  klevu-product-query --> klevu-modal
  klevu-product-query --> klevu-typography
  klevu-product-query --> klevu-chat-layout
  klevu-product-query --> klevu-chat-messages
  klevu-product-query --> klevu-loading-indicator
  klevu-product-query --> klevu-textfield
  klevu-button --> klevu-typography
  klevu-chat-layout --> klevu-typography
  klevu-chat-layout --> klevu-button
  klevu-chat-layout --> klevu-util-scrollbars
  klevu-chat-layout --> klevu-popup
  klevu-chat-layout --> klevu-textfield
  klevu-chat-messages --> klevu-chat-bubble
  klevu-chat-messages --> klevu-typography
  klevu-chat-messages --> klevu-button
  klevu-chat-messages --> klevu-slides
  klevu-chat-messages --> klevu-product
  klevu-chat-bubble --> klevu-typography
  klevu-slides --> klevu-typography
  klevu-slides --> klevu-button
  klevu-slides --> klevu-util-scrollbars
  klevu-product --> klevu-typography
  style klevu-product-query fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


