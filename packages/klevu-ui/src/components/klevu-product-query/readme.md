# klevu-product-query



<!-- Auto Generated Below -->


## Overview

Klevu Product Query application that shows a popup for asking questions about a product

## Properties

| Property               | Attribute                | Description                                                  | Type                                                                                                                                                                 | Default                                                                                         |
| ---------------------- | ------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `askButtonText`        | `ask-button-text`        | Text of the button for asking a question                     | `string \| undefined`                                                                                                                                                | `undefined`                                                                                     |
| `buttonText`           | `button-text`            | Text of the button to open the popup                         | `string`                                                                                                                                                             | `"Ask a Question"`                                                                              |
| `finePrint`            | `fine-print`             | Fine print of the popup under the title                      | `string`                                                                                                                                                             | `"I'm an AI model. Sometimes, I may make mistakes. Please verify answers on the product page."` |
| `popupAnchor`          | `popup-anchor`           | Anchor popup to which side of the origin                     | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `"bottom-start"`                                                                                |
| `popupOffset`          | `popup-offset`           | How many pixels to offset the popup from origin              | `number \| undefined`                                                                                                                                                | `undefined`                                                                                     |
| `popupTitle`           | `popup-title`            | Title of the popup                                           | `string`                                                                                                                                                             | `"Ask a Question"`                                                                              |
| `pqaWidgetId`          | `pqa-widget-id`          | Instead of Klevu API-key use a widget id to start a session  | `string \| undefined`                                                                                                                                                | `undefined`                                                                                     |
| `productId`            | `product-id`             | Alternative to url, productId can be used to start a session | `string \| undefined`                                                                                                                                                | `undefined`                                                                                     |
| `textFieldPlaceholder` | `text-field-placeholder` | Placeholder of the textfield                                 | `string`                                                                                                                                                             | `"Ask a questions"`                                                                             |
| `textFieldVariant`     | `text-field-variant`     | Variant of the textfield how does it look like               | `"default" \| "pill"`                                                                                                                                                | `"pill"`                                                                                        |
| `url`                  | `url`                    | Url of the page where the product is                         | `string`                                                                                                                                                             | `""`                                                                                            |
| `useBackground`        | `use-background`         | Use dark background with the popup                           | `boolean \| undefined`                                                                                                                                               | `undefined`                                                                                     |


## Shadow Parts

| Part                        | Description |
| --------------------------- | ----------- |
| `"klevu-query-open-button"` |             |
| `"product-query-feedback"`  |             |
| `"product-query-footer"`    |             |
| `"product-query-header"`    |             |


## Dependencies

### Depends on

- [klevu-popup](../klevu-popup)
- [klevu-button](../klevu-button)
- [klevu-typography](../klevu-typography)
- [klevu-icon](../klevu-icon)
- [klevu-util-scrollbars](../klevu-util-scrollbars)
- [klevu-chat-messages](../klevu-chat-messages)
- [klevu-loading-indicator](../klevu-loading-indicator)
- [klevu-textfield](../klevu-textfield)

### Graph
```mermaid
graph TD;
  klevu-product-query --> klevu-popup
  klevu-product-query --> klevu-button
  klevu-product-query --> klevu-typography
  klevu-product-query --> klevu-icon
  klevu-product-query --> klevu-util-scrollbars
  klevu-product-query --> klevu-chat-messages
  klevu-product-query --> klevu-loading-indicator
  klevu-product-query --> klevu-textfield
  klevu-button --> klevu-icon
  klevu-button --> klevu-typography
  klevu-chat-messages --> klevu-chat-bubble
  klevu-chat-messages --> klevu-icon
  klevu-chat-messages --> klevu-typography
  klevu-chat-messages --> klevu-button
  klevu-chat-messages --> klevu-slides
  klevu-chat-messages --> klevu-product
  klevu-chat-bubble --> klevu-typography
  klevu-chat-bubble --> klevu-icon
  klevu-chat-bubble --> klevu-button
  klevu-slides --> klevu-typography
  klevu-slides --> klevu-button
  klevu-slides --> klevu-util-scrollbars
  klevu-product --> klevu-typography
  klevu-textfield --> klevu-icon
  style klevu-product-query fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


