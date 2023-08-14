# klevu-button

<!-- Auto Generated Below -->


## Overview

Basic button component

## Properties

| Property      | Attribute      | Description                                               | Type                                       | Default     |
| ------------- | -------------- | --------------------------------------------------------- | ------------------------------------------ | ----------- |
| `disabled`    | `disabled`     | Is button disabled                                        | `boolean \| undefined`                     | `undefined` |
| `fullWidth`   | `full-width`   | Make button display block                                 | `boolean \| undefined`                     | `undefined` |
| `icon`        | `icon`         | Instead of content have an icon. So basically icon-button | `string \| undefined`                      | `undefined` |
| `isSecondary` | `is-secondary` | Toned down secondary button                               | `boolean \| undefined`                     | `undefined` |
| `isTertiary`  | `is-tertiary`  | Toned down tertiary button                                | `boolean \| undefined`                     | `undefined` |
| `size`        | `size`         |                                                           | `"large" \| "normal" \| "small" \| "tiny"` | `"normal"`  |


## Slots

| Slot        | Description |
| ----------- | ----------- |
| `"default"` | Button text |


## Shadow Parts

| Part            | Description |
| --------------- | ----------- |
| `"button-base"` |             |


## Dependencies

### Used by

 - [klevu-chat-bubble](../klevu-chat-bubble)
 - [klevu-chat-layout](../klevu-chat-layout)
 - [klevu-chat-messages](../klevu-chat-messages)
 - [klevu-facet](../klevu-facet)
 - [klevu-facet-list](../klevu-facet-list)
 - [klevu-layout-results](../klevu-layout-results)
 - [klevu-merchandising](../klevu-merchandising)
 - [klevu-moi](../klevu-moi)
 - [klevu-product-query](../klevu-product-query)
 - [klevu-product-query-popup](../klevu-product-query-popup)
 - [klevu-quicksearch](../klevu-quicksearch)
 - [klevu-search-field](../klevu-search-field)
 - [klevu-search-landing-page](../klevu-search-landing-page)
 - [klevu-slides](../klevu-slides)

### Depends on

- [klevu-icon](../klevu-icon)
- [klevu-typography](../klevu-typography)

### Graph
```mermaid
graph TD;
  klevu-button --> klevu-icon
  klevu-button --> klevu-typography
  klevu-chat-bubble --> klevu-button
  klevu-chat-layout --> klevu-button
  klevu-chat-messages --> klevu-button
  klevu-facet --> klevu-button
  klevu-facet-list --> klevu-button
  klevu-layout-results --> klevu-button
  klevu-merchandising --> klevu-button
  klevu-moi --> klevu-button
  klevu-product-query --> klevu-button
  klevu-product-query-popup --> klevu-button
  klevu-quicksearch --> klevu-button
  klevu-search-field --> klevu-button
  klevu-search-landing-page --> klevu-button
  klevu-slides --> klevu-button
  style klevu-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


