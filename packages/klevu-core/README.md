# THIS IS WORK IN PROCESS ALPHA! DO NOT USE FOR PRODUCTION!

# `@klevu/core`

Klevu core is a library that helps developers to interact with Klevu API. It includes fetching function, easy to use functions operate queries, state management for filters, data transformations and event tracking for easier usage.

The library can run it's code in browsers and in Node.js.

## Getting started

```sh
> npm install @klevu/core
```

## Initialization

Before making any request it is required to provide Klevu API key and the search server you are targeting. This should be done in the index of application or in the initialization of your app.

```ts
import { KlevuConfig } from "@klevu/core"

KlevuConfig.init({
  url: "https://<your-server>.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-xxxxxxxxxxxxx",
})
```

## KlevuFetch

Function queries are inserted into a `KlevuFetch()` function where functions are processed and sent to backend.

Here is most minimal example where we are making "hoodies" seach from the API.

```ts
import { KlevuFetch, search } from "@klevu/core"

const result = await KlevuFetch(search("hoodies"))
console.log(result.getQueriesById("search")?.records)
```

### Typical example

Following example finds result based on a term and suggestions what user could search next

```ts
import { KlevuFetch, search } from "@klevu/core"

// search string coming from a textfield
const term = "hoodies"

const result = await KlevuFetch(
  search(
    // term to search
    term,
    // search parameters
    {},
    // and lastly list of modifiers for the query.
    // In this example we are fetching all filters that are related to the search
    listFilters()
    // More modifiers can be added as parameters to search.
  ),
  // In same fetch we want to fetch all search suggestions also
  suggestion(term)
  // in here we could add more queries to fetch
)

// Prints records that are found from the search
console.log(result.getQueriesById("search")?.records)
```

## Queries

Queries implement the `KlevuFetchFunction` interface. Multiple queries can be passed onto KlevuFetch. For example its possible to get suggestions and multiple search results for typed letters in one request.

| Klevu Function      | Description                                              | Link                | Type           |
| ------------------- | -------------------------------------------------------- | ------------------- | -------------- |
| `search()`          | Most basic query to find items based on a term           | [[search]]          | Search         |
| `suggestions()`     | Fetches suggestions based on a term.                     | [[suggestions]]     | Search         |
| `trendingSearch()`  | Find all products that are trending right now in results | [[trendingSearch]]  | Search         |
| `categoryListing()` | Products to display on category page                     | [[categoryListing]] | Search         |
| `newArrivals()`     | Recommendation list of new arrivals for the current user | [[newArrivals]]     | Recommendation |
| `trending()`        | Trending recommendation based for current user           | [[trending]]        | Recommendation |
| `similarProducts()` | Fetch similar products based on given ids                | [[similarProducts]] | Recommendation |

## Modifiers

Some of the functions can be modified with modifier functions. Any number of them can be added to end of query functions

| Modifier                    | Description                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| `listFilters()`             | List all filters that given search result has                                                 |
| `applyFilters()`            | Applies selected filters to query                                                             |
| `applyFiltersWithManager()` | Applies filters that's state is managed by `FilterManager`                                    |
| `fallback()`                | When query returns less results than fallback treshold then additional fallback query is sent |
| `boostWithKeywords()`       | Boost or deboost results with keywords                                                        |
| `boostWithRecords()`        | Boost or deboost certain products in the result by id                                         |
| `boostWithFilters()`        | Boost or deboost results based on a filters                                                   |
| `boostWithFilterManager()`  | Boost or deboost results based in selection in filter manager                                 |
| `personalisation()`         | Enable personalisation to the query. Automatically applies last visited products              |

## Filter Manager

Filter Manager is a helper class that takes care of state of filters. What are currently selected and what should be sent. It can be passed to `listFilters()` and then result is automatically applied to state. Modifier `applyFiltersWithManager()` can base used to apply current state of filters to query.

@TODO: Write how DOM events are used to notify listeners about updated filters.

## Events

Klevu requires data for machine learning to work better. `KlevuEvents` class should be used to send the five basic events Klevu has.

```ts
KlevuEvents.productClick()
```

| Method                  | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| `buy()`                 | When products are bought                                       |
| `productClick()`        | When product is clicked on search results                      |
| `search()`              | When search is made. This is automatically sent in the queries |
| `recommendationClick()` | When product is clicked on list of recommended products        |
| `recommendationView()`  | When recommendations are shown                                 |
