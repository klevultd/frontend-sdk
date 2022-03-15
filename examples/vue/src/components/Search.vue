<script setup>
import QuickSearchSuggestions from './QuickSearchSuggestions.vue';
import QuickSearchLastSearches from './QuickSearchLastSearches.vue';
import QuickSearchProducts from './QuickSearchProducts.vue';
import QuickSearchTrendingProducts from './QuickSearchTrendingProducts.vue';
import useSearch from '../state/searchStore'
import {
    KlevuDomEvents,
    KlevuFetch,
    KlevuLastSearches,
    KlevuTypeOfRecord,
    search,
    suggestions,
    trendingProducts,
} from "@klevu/core"
import debounce from "lodash.debounce"

const searchStore = useSearch()

const doEmptySuggestions = async function () {
    searchStore.quickSearchOpen = true
    searchStore.setLastSearches(KlevuLastSearches.get())

    if (searchStore.trendingProducts.length > 0) {
        return
    }

    const res = await KlevuFetch(
        trendingProducts({ limit: 9 })
    )
    searchStore.setTrendingProducts(res.queriesById('trendingProducts').records ?? [])
}

const doSearch = async function () {
    if (searchStore.searchTerm.length < 3) {
        searchStore.setProducts([])
        searchStore.setSuggestions([])
        return
    }

    const result = await KlevuFetch(
        search(searchStore.searchTerm, {
            limit: 9,
            typeOfRecords: [KlevuTypeOfRecord.Product],
        }),
        suggestions(searchStore.searchTerm),
        sendSearchEvent()
    )

    searchStore.setProducts(result.queriesById("search").records ?? [])
    searchStore.setSuggestions(
        result
            .suggestionsById("suggestions")
            .suggestions.map((i) => i.suggest) ?? []
    )
}

const doSearchSubmit = function () {
    if (searchStore.searchTerm.length > 0) {
        $router.push({ path: '/search', query: { q: searchStore.searchTerm } })
    }
}

</script>

<template>
    <form @submit.prevent="doSearchSubmit" class="search-field">
        <input
            class="border px-2 text-gray-500 text-sm"
            placeholder="search"
            type="text"
            @change="doSearch"
            @keyup="doSearch"
            @focus="doEmptySuggestions"
            v-model="searchStore.searchTerm"
        />
    </form>
    <div class="quick-search" :class="{ open: searchStore.quickSearchOpen }">
        <div class="quick-search-close absolute right-0 mr-3">
            <button @click="searchStore.quickSearchOpen = false">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
        <div class="results">
            <div class="top-results">
                <QuickSearchSuggestions />
                <QuickSearchLastSearches />
            </div>
            <div class="bottom-results">
                <QuickSearchProducts />
                <QuickSearchTrendingProducts />
            </div>
        </div>
    </div>
</template>

<style scoped>
.quick-search {
    top: 48px;
    right: 10%;
    width: 80%;
    min-height: 50px;
    @apply hidden absolute border rounded text-black shadow shadow-lg bg-white px-5 py-3;
}
.quick-search.open {
    @apply block;
}
.results {
    @apply flex flex-col lg:flex-row;
}
.results .top-results {
    @apply lg:w-1/4 p-3;
}
.results .bottom-results {
    @apply lg:w-3/4 p-3;
}
</style>