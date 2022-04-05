# Klevu React example

This example is build with Typescript, React, @klevu/core, Vite (server) and @mui/material (styling)

To run the example:

> npm install

> npm start

## Initialization

Klevu configuration initialization is done in [index.tsx](./src/index.tsx) before any other code.

```ts
import { KlevuConfig } from "@klevu/core"

KlevuConfig.init({
  url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-160320037354512854",
})
```

Both the URL and API Key are provided to you when you create an account with Klevu.

## Quick search

[QuickSearch component](./src/components/quicksearch.tsx) is located in the top right corner in example. It has two functions. When user focuses to field then popup is shown where trendiding products and last searches and displayed. As a second function when user starts to type we will fetch matching products and search suggestions.

Logic for fetching trending products and KlevuLastSearches:

```ts
const fetchEmptySuggestions = async () => {
  popupState.open()
  setLastSearches(KlevuLastSearches.get())

  if (trendProducts.length > 0) {
    return
  }

  const res = await KlevuFetch(
    trendingProducts({
      limit: 3,
    })
  )
  setTrendingProducts(res.queriesById("trendingProducts")?.records ?? [])
}
```

The _KlevuFetch_ function is the main method for triggering calls to Klevu's API through the SDK. The parameters passed to this function are the actual searches you intend to make. The Klevu SDK comes with many built-in search functions that can be passed into KlevuFetch. In the above example we pass in a search by calling _trendingProducts_ with a configuration object limiting the results to just 3.

The response of KlevuFetch contains an object with helper methods. In the example above we call the queriesById method which will return data associated with the search. In this case we pull up the _trendingProducts_ search and access it's _records_ which are then passed back into Vue as an array to populate the UI.

And logic for to run after each keypress:

```ts
const doSearch = async (term: string) => {
  if (term.length < 3) {
    setProducts([])
    setSuggestions([])
    return
  }

  const result = await KlevuFetch(
    search(term, {
      limit: 9,
      typeOfRecords: [KlevuTypeOfRecord.Product],
    }),
    suggestions(term)
  )

  const searchResult = result.queriesById("search")
  clickManager = searchResult.getSearchClickManager()

  setProducts(searchResult?.records ?? [])
  setSuggestions(
    result.suggestionsById("suggestions")?.suggestions.map((i) => i.suggest) ??
      []
  )
}
```

Since React is reactive we start by simply clearing out the trendingProducts we had previously.

Then we see _KlevuFetch_ used again to make search requests to Klevu's API, but this time we are passing in two searches (search and suggestions). \*\*KlevuFetch can be passed any number of searches.

The first search we make by calling the _search_ function with two parameters. The first is the search term which we are pulling from the search input value in the UI. The second is an object were we limit the results to just 9 and we also limit the types of results to only display products.

The second search we make by calling the _suggestions_ function with a single parameter, the search term in order to return search suggestions based on that term.

## Search Landing (results) page

Building from what we've covered so far, this example introduces the use of facets (filters) and sorting.

### Search parameters

First lets start with the search used in KlevuFetch. Here we are using the same _search_ call as before, but this time we are passing in a few more parameters:

```js
const res = await KlevuFetch(
  search(
    query.get("q"),
    {
      id: "search",
      limit: 36,
      sort: sorting,
    },
    listFilters({
      rangeFilterSettings: [
        {
          key: "klevu_price",
          minMax: true,
        },
      ],
      filterManager: manager,
    }),
    applyFilterWithManager(manager)
  )
)
```

Next lets cover the sort option passed into the second parameter of the search function. The Klevu SDK includes an enumerable object called _KlevuSearchSorting_ which exposes a number of sorting methods that can be used to rearange the results.

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

As shown in the [SearchResultPage view](./src/routes/SearchResultPage.tsx) example, you do not need to include all sorting options. Also, since the SDK is written using TypeScript, most modern code editors will allow you to use autocomplete to discover which properties are available on all objects.

Next, we include a third parameter into the _search_ function by calling the _listFilters_ function. Just like the KlevuFetch function, the search function can have any number of parameters passed to it so you have the option of keeping things simple or making very complex requests. The listFilters function gets a configuration object passed to it which is specifying which filters should be used as sliders and the filterManager to use.

The filterManager is a feature provided by the Klevu SDK and can be initialized like this:

```js
const manager = new FilterManager()
```

The filterManager abstracts the management of filter states to keep the implementation easy and simple.

The fourth parameter passed to the _search_ function is a great example of the simplicity of using the filterManger. We simply pass the same instance to the _applyFilterWithManager_ in order to filter the search results based on the current state of the filterManager.

### Filters

As discussed in the previous section filters allow a user to drill down into search results and the Klevu SDK makes it easy to manage them. Once a search is performed, the filterManager is automatically updated with the current state of filters and can be accessed as arrays in _manager.options_ and _manager.sliders_ respectevely. We simply use these arrays in Reach to loop through the filters and display them:

```html
<List key={i}>
  {o.options.map((o2, i2) => (
    <ListItemButton
      key={i2}
      role={undefined}
      onClick={() => {
        manager.toggleOption(o.key, o2.name)
      }}
      dense
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={o2.selected == true}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText primary={`${o2.name} (${o2.count})`} />
    </ListItemButton>
  ))}
</List>
```

The filter is basically just a checkbox input. We can call the manager.toggleOption method when the checkbox is toggled which can in turn emits a _KlevuDomEvents.FilterSelectionUpdate_ event. When calling _manager.toggleOption_ we pass in the key of the filter along with the name of the filter value as shown above.

We then need to add an event handler to listen for the _KlevuDomEvents.FilterSelectionUpdate_ event and handle triggering a new search:

```js
document.addEventListener(
  KlevuDomEvents.FilterSelectionUpdate,
  handleFilterUpdate
)
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
  setProducts([...products, ...(nextRes.queriesById("search")?.records ?? [])])
  prevRes = nextRes
  setShowMore(Boolean(nextRes.next))
}
```

Nothing special here, but notice how we save the response of this additional search into prevRes again, so we can continue loading more results.

## Trending Product Search

On the homepage we chose to highlight another use of Klevu's search results, showing trending products.

[TrendingProductsGrid component](./src/components/trendingproductsgrid.tsx) uses all the same search functionality found in the previous SearchResultPage example except instead of calling _search_ and passing in the _searchTerm_, we call the _trendingProducts_ function instead and omit the first parameter.

```js
const res = await KlevuFetch(
  trendingProducts(
    {
      id: "search",
      limit: 36,
      sort: sorting,
    },
    listFilters({
      rangeFilterSettings: [
        {
          key: "klevu_price",
          minMax: true,
        },
      ],
      exclude: ["inventory_item_id", "rim_size", "category", "type", "tags"],
      filterManager: manager,
    }),
    applyFilterWithManager(manager)
  )
)
```

Notice how we can also pass in the filters to exclude in the _listFilters_ function.

## Category page

And finally we can look at [CategoryPage view](./src/routes/CategoryPage.tsx) to show that the Klevu SDK has yet another search type we can use specifically for requesting results from a category or collection _categoryMerchandising_. It is very similar to the _search_ function but instead of passing in a search term as the first parameter, we pass in the name of the category:

```js
const res = await KlevuFetch(
  categoryMerchandising(
    params.id,
    {
      id: "search",
      limit: 36,
      sort: sorting,
    },
    listFilters({
      rangeFilterSettings: [
        {
          key: "klevu_price",
          minMax: true,
        },
      ],
      filterManager: manager,
    }),
    applyFilterWithManager(manager),
    sendMerchandisingViewEvent(params.id)
  )
)
```
