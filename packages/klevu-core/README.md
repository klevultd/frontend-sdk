# THIS IS WORK IN PROCESS! ALPHA! DO NOT USE FOR PRODUCTION!

![Klevu](../../images/klevu_header.jpg?raw=true "Klevu")

# `@klevu/core`

Klevu core is a library that helps developers to interact with Klevu API. It includes fetching function, easy to use functions operate queries, state management for filters, data transformations and event tracking for easier usage.

The library can run it's code in browsers and in Node.js.

[Api Reference can be found from here](docs/modules.md)

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

### Result object

`KlevuFetch()` result object contains raw API response and handy helpers to get results. Use `getSuggestionsById()` to fetch suggestions results and `getQueriesById()` for search results. `next()` is nice helper to fetch next results set with same queries and modifiers. `next()` is defined only if there are more results available.

`getQueriesById()` result contains metadata for query, result records and possible event functions for providing click events to search, category merchandising and recommendations.

### Platform specific guides

- [React with Material UI](../../examples/react/README.md)
- [Vue 3](../../examples/vue/README.md)

## Queries

Queries implement the `KlevuFetchFunction` interface. Multiple queries can be passed onto KlevuFetch. For example its possible to get suggestions and multiple search results for typed letters in one request.

Detailed information in [API reference.](./docs/modules.md#Queries-Functions)

| Klevu Function            | Description                                                                      | Type           |
| ------------------------- | -------------------------------------------------------------------------------- | -------------- |
| `search()`                | Most basic query to find items based on a term                                   | Search         |
| `suggestions()`           | Fetches suggestions based on a term.                                             | Search         |
| `trendingProducts()`      | Find all products that are trending right now in results                         | Search         |
| `categoryMerchandising()` | Products to display on category page                                             | Search         |
| `searchCategory()`        | Search categories based on term                                                  | Search         |
| `searchCms()`             | Search CMS pages based on term                                                   | Search         |
| `raw`                     | Write raw request to Klevu api. For expert use                                   | Search         |
| `kmcRecommendation()`     | Fetches predefined recommendation by id from KMC and creates query automatically | Recommendation |
| `newArrivals()`           | Recommendation list of new arrivals for the current user                         | Recommendation |
| `trending()`              | Trending recommendation based for current user                                   | Recommendation |
| `similarProducts()`       | Fetch similar products based on given ids                                        | Recommendation |
| `alsoViewed()`            | Product recommendations what user should also check out                          | Recommendation |

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
| `include()`                 | Force include given id's in the result                                                        |
| `top()`                     | Force return given id's as first items on results                                             |
| `sendSearchEvent()`         | When user takes action to search something this should be used                                |

## Filter Manager

Filter Manager is a helper class that takes care of state of filters. What are currently selected and what should be sent. It can be passed to `listFilters()` and then result is automatically applied to state. Modifier `applyFiltersWithManager()` can base used to apply current state of filters to query.

## Internal DOM events

Core sends a DOM events that any browser library could listen and act on the events. All events are attached to document. KlevuDomEvents enumeration is exposed from the library and it's quite simple to listen. For example:

```ts
import { KlevuDomEvents } from "@klevu/core"

// Function to run when filter selection is updated
const handleFilterUpdate = () => {
  console.log("Filter updated")
}

// Attach event listener
document.addEventListener(
  KlevuDomEvents.FilterSelectionUpdate,
  handleFilterUpdate
)

// Don't forget remove event listener in your component destructor
document.removeEventListener(handleFilterUpdate)
```

Or as React example

```ts
import React, { useEffect } from "react";
import { KlevuDomEvents } from "@klevu/core";


function MyComponent() {
  const handleFilterUpdate = (event) => {
    console.log(event.detail)
  }

  useEffect(() => {
    document.addEventListener(
      KlevuDomEvents.FilterSelectionUpdate,
      handleFilterUpdate
    )

    // cleanup this component
    return () => {
      document.removeEventListener(
        KlevuDomEvents.FilterSelectionUpdate,
        handleFilterUpdate
      )
    }
  }, [])

  return ...
}
```

Read more from [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) about Custom Events.

See list of events from [KlevuDomEvents](src/events/klevuDomEvents.ts)

## Events

Klevu requires data for machine learning to work better. `KlevuEvents` class is low level solution to pass events to Klevu backend.

```ts
KlevuEvents.productClick()
```

| Method                                | Description                                                    |
| ------------------------------------- | -------------------------------------------------------------- |
| `buy()`                               | When products are bought                                       |
| `searchProductClick()`                | When product is clicked on search results                      |
| `search()`                            | When search is made. This is automatically sent in the queries |
| `categoryMerchandisingView()`         | When category is displayed. Should be called on paging too     |
| `categoryMerchandisingProductClick()` | When product is clicked in category page                       |
| `recommendationClick()`               | When product is clicked on list of recommended products        |
| `recommendationView()`                | When recommendations are shown                                 |

## Klevu Merchant Center settings

Users of Klevu can change settings in the Klevu Merchant Center. These settings can be easily fetched with `KlevuKMCSettings` function.

```ts
const result = await KlevuKMCSettings()
```

## Last searches

To get list of last searches you can use the `KlevuLastSearches` class.

To get the list of last searches call `KlevuLastSearches.get()` and if you wish to store a search use `KlevuLastSearches.save('user search string')`
