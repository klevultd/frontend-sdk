import {
  KlevuFetch,
  KlevuTypeOfRecord,
  search,
  suggestions,
  trendingProducts,
  KlevuConfig,
} from "@klevu/core"

const results = {
  trendingProducts: [],
  suggestions: [],
  products: [],
}

const clearResults = () => {
  results.trendingProducts = []
  results.suggestions = []
  results.products = []
}

const doSearch = async function (searchTerm) {
  clearResults()
  if (searchTerm.length < 3) {
    await doEmptySuggestions()
    return
  }
  const result = await KlevuFetch(
    search(searchTerm, {
      limit: 9,
      typeOfRecords: [KlevuTypeOfRecord.Product],
    }),
    suggestions(searchTerm)
  )

  results.products = result.queriesById("search").records ?? []
  results.suggestions =
    result.suggestionsById("suggestions").suggestions.map((i) => i.suggest) ??
    []
}

const doEmptySuggestions = async function () {
  const res = await KlevuFetch(trendingProducts({ limit: 9 }))
  results.trendingProducts = res.queriesById("trendingProducts").records ?? []
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  KlevuConfig.init({
    url: config.klevuURL,
    apiKey: config.klevuAPI,
  })

  await doSearch("")

  return {
    searchTerm: "",
    results,
  }
})
