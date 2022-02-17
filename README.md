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

## Queries and modifiers

Queries implement the `KlevuFetchFunction` interface. Multiple queries can be passed onto KlevuFetch. For example its possible to get suggestions and search results for typed letters in one request.

| function                    | type     | Description                                                |
| --------------------------- | -------- | ---------------------------------------------------------- |
| `search()`                  | Query    | Most basic query to find items based on a term             |
| `suggestions()`             | Query    | Fetches suggestions based on a term.                       |
| `trendingSearch()`          | Query    | Find all products that are trending right now in results   |
| `newArrivals()`             | Query    | Recommendation list of new arrivals for the current user   |
| `trending()`                | Query    | Trending recommendation based for current user             |
| `merchendising()`           | Query    | Products to display on category page                       |
| `listFilters()`             | Modifer  | List all filters that given search result has              |
| `applyFilters()`            | Modifier | Applies selected filters to query                          |
| `applyFiltersWithManager()` | Modifier | Applies filters that's state is managed by `FilterManager` |

## Filter Manager

## Events

# Development

Node.js and npm is required to be installed on your system before starting

Run npm to install all packages

> npm install

## VS Code run development environment

You can run full environment inside VScode. Run default build task `ctrl+shift+b` in windows and `shift+command+b` in mac. This watched builds on all projects and runs react example project.

## VSCode extensions

It is recommened to have `ESLint` and `Prettier` extensions installed in order to produce clean code.
