# klevu-quicksearch

<!-- Auto Generated Below -->


## Overview

Full app to create search bar that popups trending products and search results.

## Properties

| Property             | Attribute              | Description                                                                                                                                                                                                                                                                                                    | Type                                                                                                                                                                              | Default        |
| -------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `fallbackTerm`       | `fallback-term`        | What term should be used if there isn't enough results                                                                                                                                                                                                                                                         | `string \| undefined`                                                                                                                                                             | `undefined`    |
| `placeholder`        | `placeholder`          | Placeholder for input text                                                                                                                                                                                                                                                                                     | `string \| undefined`                                                                                                                                                             | `undefined`    |
| `popupAnchor`        | `popup-anchor`         | Anchor popup to witch side                                                                                                                                                                                                                                                                                     | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start" \| undefined` | `"bottom-end"` |
| `renderProductSlot`  | --                     | Function to render custom products. Result has to be native HTML element or a string. Provides a product being rendered. This function is called for each slot (top, image, info and bottom) of the component. Second parameter provides slot requested. Return null for slots that you do not want to render. | `((product: KlevuRecord, productSlot: KlevuProductSlots) => string \| HTMLElement \| null) \| undefined`                                                                          | `undefined`    |
| `searchCategories`   | `search-categories`    | Should component search for categories too                                                                                                                                                                                                                                                                     | `boolean \| undefined`                                                                                                                                                            | `undefined`    |
| `searchCmsPages`     | `search-cms-pages`     | Should component search for CMS pages too                                                                                                                                                                                                                                                                      | `boolean \| undefined`                                                                                                                                                            | `undefined`    |
| `searchFieldVariant` | `search-field-variant` | Change variant of the search field                                                                                                                                                                                                                                                                             | `"default" \| "pill"`                                                                                                                                                             | `"default"`    |
| `searchText`         | `search-text`          | Text of search button                                                                                                                                                                                                                                                                                          | `string \| undefined`                                                                                                                                                             | `undefined`    |


## Slots

| Slot        | Description   |
| ----------- | ------------- |
| `"content"` | Popup content |


----------------------------------------------


