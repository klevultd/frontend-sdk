# klevu-chat-messages



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute | Description                        | Type                                                                         | Default |
| ---------- | --------- | ---------------------------------- | ---------------------------------------------------------------------------- | ------- |
| `messages` | --        | Messages received from Moi backend | `(MoiResponseFilter \| MoiResponseText \| MoiProducts \| MoiLocalMessage)[]` | `[]`    |


## Events

| Event                      | Description                    | Type                                                                                                   |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `klevuChatProductClick`    | When product is clicked        | `CustomEvent<{ product: MoiProduct; }>`                                                                |
| `klevuSelectFilter`        | When product filter is clicked | `CustomEvent<{ filter: { count: string; name: string; selected: boolean \| null; value: string; }; }>` |
| `klevuSelectProductOption` | When product option is clicked | `CustomEvent<{ product: MoiProduct; option: { chat: string; intent: string; name: string; }; }>`       |


## Dependencies

### Used by

 - [klevu-product-query](../klevu-product-query)

### Depends on

- [klevu-chat-bubble](../klevu-chat-bubble)
- [klevu-typography](../klevu-typography)
- [klevu-button](../klevu-button)
- [klevu-slides](../klevu-slides)
- [klevu-product](../klevu-product)

### Graph
```mermaid
graph TD;
  klevu-chat-messages --> klevu-chat-bubble
  klevu-chat-messages --> klevu-typography
  klevu-chat-messages --> klevu-button
  klevu-chat-messages --> klevu-slides
  klevu-chat-messages --> klevu-product
  klevu-chat-bubble --> klevu-typography
  klevu-button --> klevu-typography
  klevu-slides --> klevu-typography
  klevu-slides --> klevu-button
  klevu-slides --> klevu-util-scrollbars
  klevu-product --> klevu-typography
  klevu-product-query --> klevu-chat-messages
  style klevu-chat-messages fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


