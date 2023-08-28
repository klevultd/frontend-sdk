# klevu-search-field

<!-- Auto Generated Below -->


## Overview

Plain textfield that does the searching. It queries Klevu and returns the results
in a custom event. Then you can decide what to do with the results.

## Properties

| Property             | Attribute             | Description                                          | Type                                                                                                                                                                                                                                                                                                                                                    | Default                                      |
| -------------------- | --------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `fallbackTerm`       | `fallback-term`       | Fallback term to use if there are no results         | `string \| undefined`                                                                                                                                                                                                                                                                                                                                   | `undefined`                                  |
| `limit`              | `limit`               | Maximum amount of results                            | `number`                                                                                                                                                                                                                                                                                                                                                | `10`                                         |
| `searchCategories`   | `search-categories`   | Should try to find categories as well                | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                  |
| `searchCmsPages`     | `search-cms-pages`    | Should try to find cms pages as well                 | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                  |
| `searchProducts`     | `search-products`     | Should search products                               | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                  |
| `searchSuggestions`  | `search-suggestions`  | Should search suggestions                            | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                  |
| `sendAnalytics`      | `send-analytics`      | Sends analytics when making query                    | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                  |
| `sort`               | `sort`                | In case you want to sort the results                 | `KlevuSearchSorting.AdvancedSorting \| KlevuSearchSorting.NameAsc \| KlevuSearchSorting.NameDesc \| KlevuSearchSorting.NewArrivalAsc \| KlevuSearchSorting.NewArrivalDesc \| KlevuSearchSorting.PriceAsc \| KlevuSearchSorting.PriceDesc \| KlevuSearchSorting.RatingAsc \| KlevuSearchSorting.RatingDesc \| KlevuSearchSorting.Relevance \| undefined` | `undefined`                                  |
| `tPlaceholder`       | `t-placeholder`       | The placeholder text to display in the search field. | `any`                                                                                                                                                                                                                                                                                                                                                   | `getTranslation("searchField.tPlaceholder")` |
| `tSearchText`        | `t-search-text`       | Button text                                          | `any`                                                                                                                                                                                                                                                                                                                                                   | `getTranslation("searchField.tSearchText")`  |
| `usePersonalisation` | `use-personalisation` | Enable personalisation on the query                  | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                  | `undefined`                                  |
| `variant`            | `variant`             | Variant of the search field                          | `"default" \| "pill"`                                                                                                                                                                                                                                                                                                                                   | `"default"`                                  |


## Events

| Event                    | Description                                                                                             | Type                                                                                                                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `klevuSearchClick`       | When user clicks search button. Returns the search term.                                                | `CustomEvent<string>`                                                                                                                                                                                               |
| `klevuSearchResults`     | When results come from after typing in the search field. This is debounced to avoid excessive requests. | `CustomEvent<{ fallback?: KlevuResponseQueryObject \| undefined; search?: KlevuResponseQueryObject \| undefined; category?: KlevuResponseQueryObject \| undefined; cms?: KlevuResponseQueryObject \| undefined; }>` |
| `klevuSearchSuggestions` | When searchfield gives some suggestions                                                                 | `CustomEvent<string[]>`                                                                                                                                                                                             |


## Methods

### `getPage(type: "search" | "category" | "cms", pageIndex?: number) => Promise<void>`

Fetch next page of results from previous query

#### Returns

Type: `Promise<void>`



### `getQueryResult(type: "search" | "category" | "cms") => Promise<KlevuResponseQueryObject | undefined>`

Fetches query result from last request

#### Returns

Type: `Promise<KlevuResponseQueryObject | undefined>`



### `makeSearch(term: string) => Promise<void>`

Programmatically trigger search

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [klevu-quicksearch](../klevu-quicksearch)

### Depends on

- [klevu-textfield](../klevu-textfield)
- [klevu-button](../klevu-button)

### Graph
```mermaid
graph TD;
  klevu-search-field --> klevu-textfield
  klevu-search-field --> klevu-button
  klevu-textfield --> klevu-icon
  klevu-button --> klevu-icon
  klevu-button --> klevu-typography
  klevu-quicksearch --> klevu-search-field
  style klevu-search-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


