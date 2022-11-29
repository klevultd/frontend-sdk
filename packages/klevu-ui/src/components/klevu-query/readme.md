# klevu-query

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                 | Description                                                                                  | Type                                                                                                                                                                                                                                                                                                                                                                   | Default               |
| ---------------------- | ------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `category`             | `category`                | Which category to do merchandising. Required for "merchandising" type                        | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `categoryTitle`        | `category-title`          | Which category title to have on page. Required for "merchandising" type                      | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `filterCount`          | `filter-count`            | To how many filters limit results to                                                         | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `limit`                | `limit`                   | What's the limit on page                                                                     | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `manager`              | --                        | Manager used for filters                                                                     | `FilterManager`                                                                                                                                                                                                                                                                                                                                                        | `new FilterManager()` |
| `offset`               | `offset`                  | Offset of results                                                                            | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `options`              | --                        | Object to override and settings on search options                                            | `undefined \| { id: string; categoryPath?: string \| undefined; currentProductId?: string \| undefined; itemGroupId?: string \| undefined; cartProductIds?: string[] \| undefined; } \| { id: string; searchTerm: string; } & Omit<KlevuBaseQuerySettings, "query"> \| { id: string; typeOfRecords: KlevuAnyTypeOfRecord[]; } & Omit<KlevuBaseQuerySettings, "query">` | `undefined`           |
| `recommendationId`     | `recommendation-id`       | Which recommendation to fetch from Klevu Merchant Center. Required for "recommendation" type | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `searchTerm`           | `search-term`             | What to search. Required for "search" type.                                                  | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `sort`                 | `sort`                    | How to sort                                                                                  | `KlevuSearchSorting.AdvancedSorting \| KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance \| undefined`                | `undefined`           |
| `type` _(required)_    | `type`                    | What kind of query                                                                           | `"merchandising" \| "recommendation" \| "search"`                                                                                                                                                                                                                                                                                                                      | `undefined`           |
| `updateOnFilterChange` | `update-on-filter-change` | Should component listen to changes to filters                                                | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                 | `undefined`           |


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

*Built with [StencilJS](https://stenciljs.com/)*
