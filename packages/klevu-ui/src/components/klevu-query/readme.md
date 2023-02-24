# klevu-query

`klevu-query` component is a special kind of component that makes queries to Klevu defined by the `type` parameter. It also listens to clicks to `klevu-product` and sends analytical data to Klevu based on that.

This components gives you ability to create any kind of UI with Klevu components or by using your components. Just use `klevu-query` to fetch the data and `klevu-product` to render the product cards.

<!-- Auto Generated Below -->


## Overview

__klevu-query__ component is a special kind of component that makes queries to Klevu defined by the
__type__ parameter. It also listens to clicks to __klevu-product__ -component and sends analytical data to Klevu
based on that. This components gives you ability to create any kind of UI with Klevu components or by using your own
components! Just use __klevu-query__ to fetch the data and __klevu-product__ to render the product
cards. Whole content of __klevu-product__ can be replaced with your content.

## Properties

| Property               | Attribute                 | Description                                                                                                                                                           | Type                                                                                                                                                                                                                                                                                                                                                                   | Default               |
| ---------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `category`             | `category`                | Which category to do merchandising. Required for "merchandising" type                                                                                                 | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `categoryTitle`        | `category-title`          | Which category title to have on page. Required for "merchandising" type                                                                                               | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `filterCount`          | `filter-count`            | To how many filters limit results to                                                                                                                                  | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `limit`                | `limit`                   | What's the limit on page                                                                                                                                              | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `manager`              | --                        | Manager used for filters                                                                                                                                              | `FilterManager`                                                                                                                                                                                                                                                                                                                                                        | `new FilterManager()` |
| `offset`               | `offset`                  | Offset of results                                                                                                                                                     | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `options`              | --                        | Object to override and settings on search options                                                                                                                     | `undefined \| { id: string; categoryPath?: string \| undefined; currentProductId?: string \| undefined; itemGroupId?: string \| undefined; cartProductIds?: string[] \| undefined; } \| { id: string; searchTerm: string; } & Omit<KlevuBaseQuerySettings, "query"> \| { id: string; typeOfRecords: KlevuAnyTypeOfRecord[]; } & Omit<KlevuBaseQuerySettings, "query">` | `undefined`           |
| `recommendationId`     | `recommendation-id`       | Which recommendation to fetch from Klevu Merchant Center. Required for "recommendation" type                                                                          | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `searchTerm`           | `search-term`             | What to search. Required for "search" type.                                                                                                                           | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `sendSearchViewEvent`  | `send-search-view-event`  | Should search view event be sent. View event is important for analytical cases. In case of a search this should be used only when creating a landing page for search. | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                 | `undefined`           |
| `sort`                 | `sort`                    | How to sort                                                                                                                                                           | `KlevuSearchSorting.AdvancedSorting \| KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance \| undefined`                | `undefined`           |
| `type` _(required)_    | `type`                    | What kind of query                                                                                                                                                    | `"merchandising" \| "recommendation" \| "search"`                                                                                                                                                                                                                                                                                                                      | `undefined`           |
| `updateOnFilterChange` | `update-on-filter-change` | Should component listen to changes to filters                                                                                                                         | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                 | `undefined`           |


## Events

| Event              | Description | Type                                                                 |
| ------------------ | ----------- | -------------------------------------------------------------------- |
| `klevuQueryResult` |             | `CustomEvent<{ result: KlevuQueryResult; manager: FilterManager; }>` |


## Methods

### `fetchAgain() => Promise<void>`

Force component to fetch results again

#### Returns

Type: `Promise<void>`




----------------------------------------------


