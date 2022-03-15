import { defineStore } from "pinia"

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const useSearch = defineStore("search-store", {
  state: () => {
    return {
      searchTerm: "",
      products: [],
      trendingProducts: [],
      suggestions: [],
      lastSearches: [],
      quickSearchOpen: false,
    }
  },
  actions: {
    setProducts(arr) {
      this.products =
        typeof arr == "object" && typeof arr.length != "undefined" ? arr : []
    },
    setSuggestions(arr) {
      this.suggestions =
        typeof arr == "object" && typeof arr.length != "undefined" ? arr : []
    },
    setTrendingProducts(arr) {
      this.trendingProducts =
        typeof arr == "object" && typeof arr.length != "undefined" ? arr : []
    },
    setLastSearches(arr) {
      this.lastSearches =
        typeof arr == "object" && typeof arr.length != "undefined" ? arr : []
    },
  },
})

export default useSearch
