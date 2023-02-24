# klevu-popup

<!-- Auto Generated Below -->


## Overview

Popup component where clicking origin component popups the the content

## Properties

| Property              | Attribute                | Description                                                | Type                                                                                                                                                                 | Default      |
| --------------------- | ------------------------ | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `anchor`              | `anchor`                 | Anchor popup to left or right of page                      | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `"left-end"` |
| `closeAtOutsideClick` | `close-at-outside-click` | Close popup when clicking outside content area             | `boolean`                                                                                                                                                            | `true`       |
| `fullwidthContent`    | `fullwidth-content`      | At minimum popup content should be the widht of the origin | `boolean`                                                                                                                                                            | `false`      |
| `openAtFocus`         | `open-at-focus`          | Open content when origin component is focused              | `boolean`                                                                                                                                                            | `true`       |
| `startOpen`           | `start-open`             | Initially show the popup                                   | `boolean \| undefined`                                                                                                                                               | `undefined`  |


## Methods

### `closeModal() => Promise<void>`

Closes the popup

#### Returns

Type: `Promise<void>`



### `openModal() => Promise<void>`

Opens the popup

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                               |
| ----------- | ----------------------------------------- |
| `"content"` | Content of the popup                      |
| `"origin"`  | Popoup origin that opens content of popup |


----------------------------------------------


