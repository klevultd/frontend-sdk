# klevu-moi



<!-- Auto Generated Below -->


## Overview

Klevu MOI Application

## Properties

| Property         | Attribute    | Description                                                                     | Type                                      | Default                                                                                                                                                                                  |
| ---------------- | ------------ | ------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`         | `api-key`    | Override default API key                                                        | `string \| undefined`                     | `undefined`                                                                                                                                                                              |
| `onProductClick` | --           | When a product is clicked. By default does a full page redirect to product url. | `(product: Partial<KlevuRecord>) => void` | `(product: Partial<KlevuRecord>) => {     if (!product.url) {       console.warn("No product url found. Cannot redirect")       return     }     window.location.href = product.url   }` |
| `showClose`      | `show-close` | Show close button                                                               | `boolean`                                 | `false`                                                                                                                                                                                  |


## Dependencies

### Used by

 - [klevu-quicksearch](../klevu-quicksearch)

### Depends on

- [klevu-chat-layout](../klevu-chat-layout)
- [klevu-loading-indicator](../klevu-loading-indicator)
- [klevu-button](../klevu-button)
- [klevu-modal](../klevu-modal)
- [klevu-product](../klevu-product)
- [klevu-chat-bubble](../klevu-chat-bubble)
- [klevu-typography](../klevu-typography)
- [klevu-slides](../klevu-slides)

### Graph
```mermaid
graph TD;
  klevu-moi --> klevu-chat-layout
  klevu-moi --> klevu-loading-indicator
  klevu-moi --> klevu-button
  klevu-moi --> klevu-modal
  klevu-moi --> klevu-product
  klevu-moi --> klevu-chat-bubble
  klevu-moi --> klevu-typography
  klevu-moi --> klevu-slides
  klevu-chat-layout --> klevu-typography
  klevu-chat-layout --> klevu-button
  klevu-chat-layout --> klevu-util-scrollbars
  klevu-chat-layout --> klevu-popup
  klevu-chat-layout --> klevu-textfield
  klevu-button --> klevu-typography
  klevu-product --> klevu-typography
  klevu-chat-bubble --> klevu-typography
  klevu-slides --> klevu-typography
  klevu-slides --> klevu-button
  klevu-slides --> klevu-util-scrollbars
  klevu-quicksearch --> klevu-moi
  style klevu-moi fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


