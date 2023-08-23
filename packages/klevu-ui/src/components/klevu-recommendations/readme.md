# klevu-recommendations

<!-- Auto Generated Below -->


## Overview

Full recommendation banner solution

## Properties

| Property                           | Attribute              | Description                                                                        | Type                    | Default     |
| ---------------------------------- | ---------------------- | ---------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `cartProductIds`                   | --                     | For cart recommendation you need to provide product id's in cart                   | `string[] \| undefined` | `undefined` |
| `categoryPath`                     | `category-path`        | For category product recommendation you need to provide categery path              | `string \| undefined`   | `undefined` |
| `currentProductId`                 | `current-product-id`   | For similiar products recommendation you need to provide productId and itemGroupId | `string \| undefined`   | `undefined` |
| `itemGroupId`                      | `item-group-id`        | For similiar products recommendation you need to provide productId and itemGroupId | `string \| undefined`   | `undefined` |
| `recommendationId` _(required)_    | `recommendation-id`    | The ID of the recommendation                                                       | `string`                | `undefined` |
| `recommendationTitle` _(required)_ | `recommendation-title` | Title of the recommendation                                                        | `string`                | `undefined` |


## Events

| Event  | Description                                      | Type                                    |
| ------ | ------------------------------------------------ | --------------------------------------- |
| `data` | When Recommndations data is available or updated | `CustomEvent<KlevuResponseQueryObject>` |


## Dependencies

### Depends on

- [klevu-slides](../klevu-slides)
- [klevu-product](../klevu-product)

### Graph
```mermaid
graph TD;
  klevu-recommendations --> klevu-slides
  klevu-recommendations --> klevu-product
  klevu-slides --> klevu-typography
  klevu-slides --> klevu-button
  klevu-slides --> klevu-util-scrollbars
  klevu-button --> klevu-icon
  klevu-button --> klevu-typography
  klevu-product --> klevu-icon
  klevu-product --> klevu-typography
  klevu-product --> klevu-button
  style klevu-recommendations fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


