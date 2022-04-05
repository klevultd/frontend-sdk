# Klevu Vue 3 Example

This example is build with Vue 3, Pinia (data store), Vite (server), @klevu/core, and TailwindCSS (styling)

This example should help get you started integrating Klevu's Frontend SDK with your Vue 3 project. The templates in this example use Vue 3 `<script setup>` SFCs (Single-File Components). Since this is a Vue app, we chose to use Pinia instead of Vuex to handle data.

The Klevu SDK integration in this example can be broken down into 5 main areas:

- **Initialization:**
  - Setup the SDK once
- **Quick Search:**
  - Add Quick Search to the global navigation of the example app
- **Search Landing Page:**
  - Show search results with Klevu's filter and sorting options
- **Trending Product Search:**
  - Show trending products on the homepage
- **Category Merchandizing Page:**
  - Show products in a category with Klevu's filter and sorting options

To run the example:

> npm install

> npm start

## Initialization

Klevu configuration initialization is done in [App.vue](./src/App.vue) before any other code by importing KlevuConfig from @klevu/core.

```js
import { KlevuConfig } from "@klevu/core"

KlevuConfig.init({
  url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-160320037354512854",
})
```

Both the URL and API Key are provided to you when you create an account with Klevu.

## Quick Search

[Search component](./src/components/Search.vue) is located in the top right corner in example. It has two functions. When user focuses to field then popup is shown where trendiding products and last searches are displayed. As a second function when user starts to type we will fetch matching products and search suggestions.

In the UI we added event handlers onto the input element:

```html
<input
  placeholder="Search"
  type="text"
  @change="debouncedSearchHandler"
  @keyup="debouncedSearchHandler"
  @focus="doEmptySuggestions"
  v-model="quickSearchStore.searchTerm"
/>
```

When a user focuses on the search field the following logic is triggered:

```js
const doEmptySuggestions = async function () {
  quickSearchStore.quickSearchOpen = true
  quickSearchStore.setLastSearches(KlevuLastSearches.get())

  if (quickSearchStore.trendingProducts.length > 0) {
    return
  }

  const res = await KlevuFetch(trendingProducts({ limit: 9 }))
  quickSearchStore.setTrendingProducts(
    res.queriesById("trendingProducts").records ?? []
  )
}
```

The _KlevuFetch_ function is the main method for triggering calls to Klevu's API through the SDK. The parameters passed to this function are the actual searches you intend to make. The Klevu SDK comes with many built-in search functions that can be passed into KlevuFetch. In the above example we pass in a search by calling _trendingProducts_ with a configuration object limiting the results to just 9.

The response of KlevuFetch contains an object with helper methods. In the example above we call the queriesById method which will return data associated with the search. In this case we pull up the _trendingProducts_ search and access it's _records_ which are then passed back into Vue as an array to populate the UI.

When a user starts typing at least 3 characters into the search the following logic is triggered:

```js
const doSearch = async function () {
  if (quickSearchStore.searchTerm.length < 3) {
    clearSearchResults()
    doEmptySuggestions()
    return
  }
  quickSearchStore.setTrendingProducts([])
  const result = await KlevuFetch(
    search(quickSearchStore.searchTerm, {
      limit: 9,
      typeOfRecords: [KlevuTypeOfRecord.Product],
    }),
    suggestions(quickSearchStore.searchTerm)
  )

  quickSearchStore.setProducts(result.queriesById("search").records ?? [])
  quickSearchStore.setSuggestions(
    result.suggestionsById("suggestions").suggestions.map((i) => i.suggest) ??
      []
  )
}
```

Since Vue is reactive we start by simply clearing out the trendingProducts we had previously.

Then we see _KlevuFetch_ used again to make search requests to Klevu's API, but this time we are passing in two searches (search and suggestions). \*\*KlevuFetch can be passed any number of searches.

The first search we make by calling the _search_ function with two parameters. The first is the search term which we are pulling from the search input value in the UI. The second is an object were we limit the results to just 9 and we also limit the types of results to only display products.

The second search we make by calling the _suggestions_ function with a single parameter, the search term in order to return search suggestions based on that term.

## Search Landing Page

This Vue example app uses the vue-router plugin to handle page navigation. When a user clicks the enter key on the search input field in the navigation, the value is passed as a URL parameter to the [Search view](./src/views/Search.vue).

Building from what we've covered so far, this example introduces the use of facets (filters) and sorting.

### Search parameters

First lets start with the search used in KlevuFetch. Here we are using the same _search_ call as before, but this time we are passing in a few more parameters:

```js
const res = await KlevuFetch(
  search(
    props.searchTerm,
    {
      id: "search",
      limit: 36,
      sort: searchStore.sorting,
    },
    listFilters({
      rangeFilterSettings: [
        {
          key: "klevu_price",
          minMax: true,
        },
      ],
      exclude: searchStore.homeFilterExcludes,
      filterManager: manager,
    }),
    applyFilterWithManager(manager),
    sendSearchEvent()
  )
)
```

First lets start by covering the sort option passed into the second parameter of the search function. The Klevu SDK includes an enumerable object called _KlevuSearchSorting_ which exposes a number of sorting methods that can be used to rearange the results.

The available sorting options are:

- Relevance (Relevance)
- Price Ascending (PriceAsc)
- Price Descending (PriceDesc)
- Name Ascending NameAsc)
- Name Descending (NameDesc)
- Rating Ascending (RatingAsc)
- Rating Descending (RatingDesc)
- New Arrivals Ascending (NewArrivalAsc)
- New Arrivals Descending (NewArrivalDesc)

As shown in the [Search view](./src/views/Search.vue) example, you do not need to include all sorting options. Also, since the SDK is written using TypeScript, most modern code editors will allow you to use autocomplete to discover which properties are available on all objects.

Next, we include a third parameter into the _search_ function by calling the _listFilters_ function. Just like the KlevuFetch function, the search function can have any number of parameters passed to it so you have the option of keeping things simple or making very complex requests. The listFilters function gets a configuration object passed to it which is specifying which filters should be used as sliders, which filters to exclude from being returned by Klevu, and the filterManager to use.

The filterManager is a feature provided by the Klevu SDK and can be initialized like this:

```js
const manager = new FilterManager()
```

The filterManager abstracts the management of filter states to keep the implementation easy and simple.

The fourth parameter passed to the _search_ function is a great example of the simplicity of using the filterManger. We simply pass the same instance to the _applyFilterWithManager_ in order to filter the search results based on the current state of the filterManager.

And finally, the fifth parameter passed into the _search_ function is a call to _sendSearchEvent_. This is a simple way to send Klevu the analytics data it needs to log this search.

### Filters

As discussed in the previous section filters allow a user to drill down into search results and the Klevu SDK makes it easy to manage them. Once a search is performed, the filterManager is automatically updated with the current state of filters and can be accessed as arrays in _manager.options_ and _manager.sliders_ respectevely. We simply use these arrays in Vue's reactivity system to v-for through the arrays and display them:

```html
<option
  v-for="(option, index) in searchStore.options"
  :key="index"
  :option="option"
  :manager="manager"
/>
```

The filter is basically just a checkbox input. We can pass in the manager instance to the Option component in our example which can in turn emit a _KlevuDomEvents.FilterSelectionUpdate_ event when the checkbox is toggled. This is done automatically by calling _manager.toggleOption_ and passing in the key of the filter along with the name of the filter value as shown in [Option component](./src/components/Option.vue)

We then need to add an event handler to listen for the _KlevuDomEvents.FilterSelectionUpdate_ event and handle triggering a new search:

```js
document.addEventListener(KlevuDomEvents.FilterSelectionUpdate, initialFetch)
```

See how filterManager makes it easy to manage filters 😉

### Load More

Another Klevu SDK feature used in this example is the load more button at the bottom of the results.

The response from KlevuFetch has a _next_ method when there are still more results. Otherwise it returns false. We can use this function to call for more results without having to specify all the parameters we originally passed to the _search_ function.

In this example we saved the response to a variable called prevRes, we then handle loading more results by calling the following function:

```js
const fetchMore = async () => {
  const nextRes = await prevRes.next({
    filterManager: manager,
  })
  searchStore.setProducts([
    ...searchStore.products,
    ...(nextRes.queriesById("search").records ?? []),
  ])
  prevRes = nextRes
  searchStore.showMore = Boolean(nextRes.next)
}
```

Nothing special here, but notice how we save the response of this additional search into prevRes again, so we can continue loading more results.

## Trending Product Search

On the homepage we chose to highlight another use of Klevu's search results, showing trending products.

[Home view](./src/views/Home.vue) uses all the same search functionality found in the [Search view](./src/view/Search.vue) except instead of calling _search_ and passing in the _searchTerm_, we call the _trendingProducts_ function instead and omit the first parameter.

```js
const res = await KlevuFetch(
  trendingProducts(
    {
      id: "search",
      limit: 36,
      sort: searchStore.sorting,
    },
    listFilters({
      rangeFilterSettings: [
        {
          key: "klevu_price",
          minMax: true,
        },
      ],
      exclude: searchStore.homeFilterExcludes,
      filterManager: manager,
    }),
    applyFilterWithManager(manager)
  )
)
```

## Category Merchandizing Page

The Klevu SDK has another search type we can use specifically for requesting results from a category or collection _categoryMerchandising_. It is very similar to the _search_ function but instead of passing in a search term as the first parameter, we pass in the name of the category:

```js
const res = await KlevuFetch(
  categoryMerchandising(
    route.params.id,
    {
      id: "search",
      limit: 36,
      sort: searchStore.sorting,
    },
    listFilters({
      rangeFilterSettings: [
        {
          key: "klevu_price",
          minMax: true,
        },
      ],
      exclude: searchStore.collectionFilterExcludes,
      filterManager: manager,
    }),
    applyFilterWithManager(manager)
  )
)
```
