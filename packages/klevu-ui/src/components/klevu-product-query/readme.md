# klevu-product-query



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                  | Type                   | Default                                                                                  |
| ---------------------- | ------------------------ | ------------------------------------------------------------ | ---------------------- | ---------------------------------------------------------------------------------------- |
| `askButtonText`        | `ask-button-text`        | Text of the button for asking a question                     | `string \| undefined`  | `undefined`                                                                              |
| `buttonText`           | `button-text`            | Text of the button to open the popup                         | `string`               | `"Ask a Question"`                                                                       |
| `finePrint`            | `fine-print`             | Fine print of the popup under the title                      | `string`               | `"I'm an AI model. Sometimes, I may make mistakes. Please verify answers on this page."` |
| `productId`            | `product-id`             | Alternative to url, productId can be used to start a session | `string \| undefined`  | `undefined`                                                                              |
| `textFieldPlaceholder` | `text-field-placeholder` | Placeholder of the textfield                                 | `string`               | `"Ask a question"`                                                                       |
| `textFieldVariant`     | `text-field-variant`     | Variant of the textfield how does it look like               | `"default" \| "pill"`  | `"pill"`                                                                                 |
| `title`                | `title`                  | Title of the popup                                           | `string`               | `"Ask a Question"`                                                                       |
| `url`                  | `url`                    | Url of the page where the product is                         | `string`               | `""`                                                                                     |
| `useBackground`        | `use-background`         | Use dark background with the popup                           | `boolean \| undefined` | `undefined`                                                                              |


## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"material-icon"` |             |


## Dependencies

### Depends on

- [klevu-popup](../klevu-popup)
- [klevu-button](../klevu-button)
- [klevu-typography](../klevu-typography)
- [klevu-chat-layout](../klevu-chat-layout)
- [klevu-chat-messages](../klevu-chat-messages)
- [klevu-loading-indicator](../klevu-loading-indicator)
- [klevu-textfield](../klevu-textfield)

### Graph
```mermaid
graph TD;
  klevu-product-query --> klevu-popup
  klevu-product-query --> klevu-button
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


