![Klevu](../../images/klevu_header.jpg?raw=true "Klevu")

[![npm version][npm-src]][npm-href]
[![Bundle size][bundlephobia-src]][bundlephobia-href]
[![npm total downloads][npm-total-downloads]][npm-href]
[![npm weekly downloads][npm-weekly-downloads]][npm-href]
![github stars][github-stars-src]
![github issues][github-issues-src]

# `@klevu/core`

Klevu core is a library that helps developers to interact with Klevu API. It includes a fetching function, easy-to-use functions to perform queries, state management for filters, data transformations and event tracking for easier usage.

The library can run its code in browsers and Node.js.

[Api Reference can be found from here](docs/modules.md)

## Getting started

```sh
> npm install @klevu/core
```

## Initialization

Before making any request it is required to provide the Klevu API key and the search server you are targeting. This should be done in the index of the application or the initialization of your app.

```ts
import { KlevuConfig } from "@klevu/core"

KlevuConfig.init({
  url: "https://<your-server>.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-xxxxxxxxxxxxx",
})
```

If you wish to use Axios to enable SSR or you wish to support old IE browser you can use axios npm package with the library.

First you need to install it into to your project with

```sh
> npm install axios
```

Then import and add it to your configuration.

```ts
import { KlevuConfig } from "@klevu/core"
import axios from "axios"

KlevuConfig.init({
  url: "https://<your-server>.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-xxxxxxxxxxxxx",
  axios,
})
```

Then axios will be used for fetching data.

## KlevuFetch

Function queries are inserted into a `KlevuFetch()` function where functions are processed and sent to the backend.

Here is the most minimal example where we are making a "hoodies" search from the API.

```ts
import { KlevuFetch, search } from "@klevu/core"

const result = await KlevuFetch(search("hoodies"))
console.log(result.getQueriesById("search")?.records)
```

### Typical example

The following example finds results based on a term and suggestions what the user could search for next

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

`KlevuFetch()` result object contains raw API response and handy helpers to get results. Use `getSuggestionsById()` to fetch suggestions results and `getQueriesById()` for search results.

`getQueriesById()` result contains metadata for query, the result records and possible event functions for providing click events to search, category merchandising and recommendations. It also includes `next()` function. It is a nice helper to fetch the next results set with the same query and modifiers. `next()` is defined only if there are more results available.

Calling event functions returns a function to use to send events to Klevu. [See definition these functions from here](./src/models/KlevuResultEvent.ts)

### Platform-specific guides

- [React with Material UI](../../examples/react/README.md)
- [Vue 3](../../examples/vue/README.md)

## Queries

Queries implement the `KlevuFetchFunction` interface. Multiple queries can be passed onto KlevuFetch. For example its possible to get suggestions and multiple search results for typed letters in one request.

Detailed information in [API reference.](./docs/modules.md#Queries-Functions)

| Klevu Function               | Description                                                                      | Type           |
| ---------------------------- | -------------------------------------------------------------------------------- | -------------- |
| `search()`                   | Most basic query to find items based on a term                                   | Search         |
| `suggestions()`              | Fetches suggestions based on a term.                                             | Search         |
| `trendingProducts()`         | Find all products that are trending right now in results                         | Search         |
| `categoryMerchandising()`    | Products to display on category page                                             | Search         |
| `searchCategory()`           | Search categories based on term                                                  | Search         |
| `searchCms()`                | Search CMS pages based on term                                                   | Search         |
| `products()`                 | Fetches products by id from Klevu                                                | Search         |
| `raw`                        | Write raw request to Klevu api. For expert use                                   | Search         |
| `recentlyViewedProducts()`   | List of products user has recently viewed                                        | Search         |
| `kmcRecommendation()`        | Fetches predefined recommendation by id from KMC and creates query automatically | Recommendation |
| `newArrivals()`              | Recommendation list of new arrivals for the current user                         | Recommendation |
| `trendingCategoryProducts()` | Trending recommendation based for current user                                   | Recommendation |
| `similarProducts()`          | Fetch similar products based on given ids                                        | Recommendation |
| `alsoViewed()`               | Product recommendations what user should also check out                          | Recommendation |
| `boughtTogether()`           | On checkout page check what products are recommended to current cart products    | Recommendation |

## Modifiers

Some of the functions can be modified with modifier functions. Any number of them can be added to end of query functions

| Modifier                        | Description                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `listFilters()`                 | List all filters that given search result has                                                        |
| `applyFilters()`                | Applies selected filters to query                                                                    |
| `applyFiltersWithManager()`     | Applies filters that's state is managed by `FilterManager`                                           |
| `fallback()`                    | When query returns less results than fallback treshold then additional fallback query is sent        |
| `boostWithKeywords()`           | Boost or deboost results with keywords                                                               |
| `boostWithRecords()`            | Boost or deboost certain products in the result by id                                                |
| `boostWithFilters()`            | Boost or deboost results based on a filters                                                          |
| `boostWithFilterManager()`      | Boost or deboost results based in selection in filter manager                                        |
| `personalisation()`             | Enable personalisation to the query. Automatically applies last visited products                     |
| `include()`                     | Force include given id's in the result                                                               |
| `top()`                         | Force return given id's as first items on results                                                    |
| `sendSearchEvent()`             | When user takes action to search something this should be used                                       |
| `sendMerchandisingViewEvent()`  | Should be used with `categoryMerchandising()` query to send view event of merchandising              |
| `sendRecommendationViewEvent()` | Should be used with all recommendation queries. Send a analytical data about recommendation to Klevu |
| `debug()`                       | Prints query results to console                                                                      |
| `abTest()`                      | Enable A/B testing for the category merchandising                                                    |
| `overrideSettings()`            | Allows to override any setting in query. ⚠️ Use with caution!                                        |

## Filter Manager

Filter Manager is a helper class that takes care of the state of filters. What filters are currently selected and what should be sent. It can be passed to `listFilters()` and then the result is automatically applied to the state. Modifier `applyFiltersWithManager()` can base used to apply the current state of filters to query.

## Internal DOM events

Core sends a DOM events that any browser library could listen and act on the events. All events are attached to document. KlevuDomEvents enumeration is exposed from the library and it's quite simple to listen. For example:

```ts
import { KlevuDomEvents, KlevuListenDomEvent } from "@klevu/core"

// Function to run when filter selection is updated
const handleFilterUpdate = () => {
  console.log("Filter updated")
}

// Attach event listener
const stop = KlevuListenDomEvent(
  KlevuDomEvents.FilterSelectionUpdate,
  handleFilterUpdate
)

// Don't forget remove event listener in your component destructor
stop()
```

Or as React example

```ts
import React, { useEffect } from "react";
import { KlevuDomEvents, KlevuListenDomEvent } from "@klevu/core";


function MyComponent() {
  const handleFilterUpdate = (event) => {
    console.log(event.detail)
  }

  useEffect(() => {
    const stop = KlevuListenDomEvent(
      KlevuDomEvents.FilterSelectionUpdate,
      handleFilterUpdate
    )

    // cleanup this component
    return () => {
      stop()
    }
  }, [])

  return ...
}
```

Read more from [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) about Custom Events.

See the list of events from [KlevuDomEvents](src/events/klevuDomEvents.ts)

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

To get the list of last searches you can use the `KlevuLastSearches` class.

To get the list of last searches call `KlevuLastSearches.get()` and if you wish to store a search use `KlevuLastSearches.save('user search string')`

## A/B Testing

Currently A/B testing is supported only in the category merchandising. To enable A/B testing add `abTest()` modifier to `categoryMerchandising()` query function.

For A/B testing to work correctly you need to provide correct event data to Klevu. Best way is to use `getCategoryMerchandisingClickSendEvent()` send event helper from [result object](./src/models/KlevuResultEvent.ts)
.

# SSR request packing and hydration

Typically SSR frameworks (Next, Nuxt, Remix, etc) will transfer data from backend to frontend in JSON format. Passing KlevuFetch result object to frontend won't work as it is filled with functions that help the usage of results.

There is an option to just pass raw JSON with `result.apiResponse` and build your logic on top of that.

If you wish to keep using helper functions provided in results you can use `KlevuPackFetchResult()` function to pack result like:

```ts
const result = await KlevuFetch(search("hello world"))
const dataToTransferFrontend = KlevuPackFetchResult(result)
```

And then you can hydrate it in frontend with `KlevuHydratePackedFetchResult()` function.

```ts
const resultObject = KlevuHydratePackedFetchResult(dataToTransferFrontend, [
  search("hello world"),
])
```

It's important to note that the second parameter of `KlevuHydratePackedFetchResult()` has to be the same as in backend call. You can create query functions in a separate file that can be called both in frontend and backend. For example:

```ts
// file: myquery.ts
// a bit more compilicated query. Search term can be read in backend
// from request parameters and in frontend it could be in url parameters
const myQuery = (searchTerm: string, manager: FilterManager) => [
  search(
    searchTerm,
    {},
    listFilters(),
    applyFilterwithManager(manager),
    boostWithKeyword({ keyword: "foobar", weight: 1.2 })
  ),
  suggestions(searchTerm),
]

// file: backend.ts
// in backend manager is not used to set anything so it can be just instanciated as param
const result = await KlevuFetch(myQuery("hello world", new FilterManager()))
const dataToTransferFrontend = KlevuPackFetchResult(result)

// file: frontend.ts
// in frontend we usually want to change and set filters with manager so it's used as separate variable
const manager = new FilterManager()
const resultObject = KlevuHydratePackedFetchResult(
  dataToTransferFrontend,
  myQuery("hello world", manager)
)
console.log(manager.options)
```

[npm-src]: https://badgen.net/npm/v/@klevu/core
[npm-href]: https://www.npmjs.com/package/@klevu/core
[bundlephobia-src]: https://badgen.net/bundlephobia/minzip/@klevu/core
[bundlephobia-href]: https://bundlephobia.com/package/@klevu/core
[npm-weekly-downloads]: https://badgen.net/npm/dw/@klevu/core
[npm-total-downloads]: https://badgen.net/npm/dt/@klevu/core
[github-stars-src]: https://badgen.net/github/stars/klevultd/frontend-sdk?color=purple
[github-issues-src]: https://badgen.net/github/issues/klevultd/frontend-sdk?color=purple
[github-href]: https://github.com/klevultd/frontend-sdk
