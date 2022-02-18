# Klevu Headless mono repository

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

Here is most minimal example

```ts
import { KlevuFetch, search } from "@klevu/core"

const result = await KlevuFetch(search("hoodies"))
console.log(result.getQueriesById("hoodies")?.records)
```

## Queries

Queries implement the `KlevuFetchFunction` interface. Multiple queries can be passed onto KlevuFetch. For example its possible to get suggestions and multiple search results for typed letters in one request.

| Klevu Function     | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `search()`         | Most basic query to find items based on a term           |
| `suggestions()`    | Fetches suggestions based on a term.                     |
| `trendingSearch()` | Find all products that are trending right now in results |
| `newArrivals()`    | Recommendation list of new arrivals for the current user |
| `trending()`       | Trending recommendation based for current user           |
| `merchendising()`  | Products to display on category page                     |

## Modifiers

Some of the functions can be modified with modifier functions. Any number of them can be added to end of query functions

| Modifier                    | Description                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| `listFilters()`             | List all filters that given search result has                                                 |
| `applyFilters()`            | Applies selected filters to query                                                             |
| `applyFiltersWithManager()` | Applies filters that's state is managed by `FilterManager`                                    |
| `fallback()`                | When query returns less results than fallback treshold then additional fallback query is sent |

## Filter Manager

Filter Manager is a helper class that takes care of state of filters. What are currently selected and what should be sent. It can be passed to `listFilters()` and then result is automatically applied to state. Modifier `applyFiltersWithManager()` can base used to apply current state of filters to query.

@TODO: Write how DOM events are used to notify listeners about updated filters.

## Events

Klevu requires data for machine learning to work better. `KlevuEvents` class should be used to send the five basic events Klevu has.

```ts
KlevuEvents.productClick()
```

| Method            | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `buy()`           | When products are bought                                       |
| `categoryClick()` | When product is clicked on category page                       |
| `categoryView()`  | When certain category is viewed                                |
| `productClick()`  | When product is clicked on search results                      |
| `search()`        | When search is made. This is automatically sent in the queries |

# Development

Node.js and npm is required to be installed on your system before starting

Run npm to install all packages

> npm install

## VS Code run development environment

You can run full environment inside VScode. Run default build task `ctrl+shift+b` in windows and `shift+command+b` in mac. This watched builds on all projects and runs react example project.

## VSCode extensions

It is recommened to have `ESLint` and `Prettier` extensions installed in order to produce clean code.
