# klevu-query

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                 | Description                          | Type                                                                                                                                                                                                                                                                                                                                                                   | Default               |
| ---------------------- | ------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `category`             | `category`                |                                      | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `categoryTitle`        | `category-title`          |                                      | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `filterCount`          | `filter-count`            | To how many filters limit results to | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `limit`                | `limit`                   | What's the limit on page             | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `manager`              | --                        |                                      | `FilterManager`                                                                                                                                                                                                                                                                                                                                                        | `new FilterManager()` |
| `offset`               | `offset`                  | Offset of results                    | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `options`              | --                        | Overriden                            | `undefined \| { id: string; categoryPath?: string \| undefined; currentProductId?: string \| undefined; itemGroupId?: string \| undefined; cartProductIds?: string[] \| undefined; } \| { id: string; searchTerm: string; } & Omit<KlevuBaseQuerySettings, "query"> \| { id: string; typeOfRecords: KlevuAnyTypeOfRecord[]; } & Omit<KlevuBaseQuerySettings, "query">` | `undefined`           |
| `recommendationId`     | `recommendation-id`       |                                      | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `searchTerm`           | `search-term`             |                                      | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                  | `undefined`           |
| `sort`                 | `sort`                    | How to sort                          | `KlevuSearchSorting.AdvancedSorting \| KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance \| undefined`                | `undefined`           |
| `type` _(required)_    | `type`                    | What kind of query                   | `"merchandising" \| "recommendation" \| "search"`                                                                                                                                                                                                                                                                                                                      | `undefined`           |
| `updateOnFilterChange` | `update-on-filter-change` |                                      | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                 | `undefined`           |


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
