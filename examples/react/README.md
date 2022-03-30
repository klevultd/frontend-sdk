# Klevu React example

This example is build with Typescript, React, @klevu/core and @mui/material

To run the example:

> npm install

> npm start

## Initialization

Klevu configuration initialization is done in [index.tsx](./src/index.tsx) before any other code.

```ts
KlevuConfig.init({
  url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-160320037354512854",
})
```

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

  setProducts(result.queriesById("search")?.records ?? [])
  setSuggestions(
    result.suggestionsById("suggestions")?.suggestions.map((i) => i.suggest) ??
      []
  )
}
```

## Search result page

todo

## Category page

todo
