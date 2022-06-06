import { defineStore } from "pinia"
import { KlevuSearchSorting } from "@klevu/core"
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const useSearch = defineStore("search-store", {
  state: () => {
    return {
      searchTerm: "",
      products: [],
      recommendationProducts: [],
      options: [],
      sliders: [],
      similarProducts: [],
      sorting: KlevuSearchSorting.Relevance,
      homeFilterExcludes: [
        "inventory_item_id",
        "rim_size",
        "category",
        "type",
        "tags",
      ],
      collectionFilterExcludes: [],
      showMore: false,
      loading: true,
      filtersOpen: false,
      manager: null,
      searchFn: null,
    }
  },
  actions: {
    setProducts(arr) {
      this.products =
        typeof arr == "object" && typeof arr.length != "undefined" ? arr : []
    },
    setRecommendationProducts(arr) {
      this.recommendationProducts =
        typeof arr == "object" && typeof arr.length != "undefined" ? arr : []
    },
    setSimilar(arr) {
      this.similarProducts =
        typeof arr == "object" && typeof arr.length != "undefined" ? arr : []
    },
    setOptions(arr) {
      this.options =
        typeof arr == "object" && typeof arr.length != "undefined" ? arr : []
    },
    setSliders(arr) {
      this.sliders =
        typeof arr == "object" && typeof arr.length != "undefined" ? arr : []
    },
    resetSearch() {
      this.searchTerm = ""
      this.clearSearchResults()
      this.setSimilar([])
    },
    clearSearchResults() {
      this.showMore = false
      this.setProducts([])
      this.setRecommendationProducts([])
      this.setOptions([])
      this.setSliders([])
    },
  },
})

export default useSearch
