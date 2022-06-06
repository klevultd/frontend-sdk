<template>
  <div class="relative">
    <div class="form-control">
      <form @submit.prevent="doSearchSubmit" class="input-group">
        <input
          type="text"
          @change="debouncedSearchHandler"
          @keyup="debouncedSearchHandler"
          @focus="debouncedSearchHandler"
          @blur="blurHandler"
          v-model="quickSearchStore.searchTerm"
          id="quickSearchInput"
          placeholder="Search…"
          autocomplete="off"
          class="input input-bordered w-32 lg:w-48 focus:outline-none focus:ring-primary focus:border-none"
        />
        <button class="btn btn-square bg-primary border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import useQuickSearch from "../stores/quickSearchStore"
import { KlevuLastSearches } from "@klevu/core"
import {
  KlevuFetch,
  KlevuTypeOfRecord,
  search,
  suggestions,
  trendingProducts,
  KlevuConfig,
} from "@klevu/core"

// 'page:start'

const router = useRouter()
const quickSearchStore = useQuickSearch()
const config = useRuntimeConfig()

KlevuConfig.init({
  url: config.klevuUrl,
  apiKey: config.klevuApikey,
})

const doSearch = async function (e) {
  if (quickSearchStore.submitting) return null
  showQuickSearch()
  clearSearchResults()
  quickSearchStore.loading = true

  if (quickSearchStore.searchTerm < 3) {
    await doEmptySuggestions()
    return
  }
  const result = await KlevuFetch(
    search(quickSearchStore.searchTerm, {
      limit: 9,
      typeOfRecords: [KlevuTypeOfRecord.Product],
    }),
    suggestions(quickSearchStore.searchTerm)
  )

  quickSearchStore.loading = false

  quickSearchStore.setProducts(result.queriesById("search").records ?? [])
  quickSearchStore.setSuggestions(
    result.suggestionsById("suggestions").suggestions.map((i) => i.suggest) ??
      []
  )
}

const debouncedSearchHandler = useDebounceFn(doSearch, 300)

const doEmptySuggestions = async function () {
  const res = await KlevuFetch(trendingProducts({ limit: 9 }))
  quickSearchStore.loading = false
  quickSearchStore.setLastSearches(KlevuLastSearches.get())
  quickSearchStore.setTrendingProducts(
    res.queriesById("trendingProducts").records ?? []
  )
}

const clearSearchResults = () => {
  quickSearchStore.setProducts([])
  quickSearchStore.setSuggestions([])
  quickSearchStore.setTrendingProducts([])
}

const doSearchSubmit = function () {
  quickSearchStore.submitting = true
  const searchTerm = quickSearchStore.searchTerm
  document.getElementById("quickSearchInput").blur()
  closeQuickSearch()
  if (searchTerm.length > 0) {
    router.push({ path: "/search/", query: { q: searchTerm } })
  }
}

const showQuickSearch = () => {
  quickSearchStore.quickSearchOpen = true
  document.body.classList.add("show-quick-search")
}

const closeQuickSearch = (e) => {
  // document.getElementById("quickSearchInput").blur()

  quickSearchStore.quickSearchOpen = false
  quickSearchStore.searchTerm = ""
  clearSearchResults()
}

const blurHandler = (e) => {
  console.log("close quicksearch")
  setTimeout(() => {
    quickSearchStore.quickSearchOpen = false
  }, 500)
}
</script>
