import { defineStore } from "pinia"
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const useQuickSearch = defineStore("quick-search-store", {
  state: () => {
    return {
      searchTerm: "",
      products: [],
      trendingProducts: [],
      suggestions: [],
      lastSearches: [],
      quickSearchOpen: false,
      loading: true,
      submitting: false,
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

export default useQuickSearch
