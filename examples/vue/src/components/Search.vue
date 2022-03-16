<script setup>
import { useRouter } from 'vue-router'
import QuickSearchSuggestions from './QuickSearchSuggestions.vue';
import QuickSearchLastSearches from './QuickSearchLastSearches.vue';
import QuickSearchProducts from './QuickSearchProducts.vue';
import QuickSearchTrendingProducts from './QuickSearchTrendingProducts.vue';
import useQuickSearch from '../state/quickSearchStore'
import {
    KlevuDomEvents,
    KlevuFetch,
    KlevuLastSearches,
    KlevuTypeOfRecord,
    search,
    suggestions,
    trendingProducts
} from "@klevu/core"
import debounce from "lodash.debounce"

const router = useRouter()
const quickSearchStore = useQuickSearch()

const doEmptySuggestions = async function () {
    quickSearchStore.quickSearchOpen = true
    quickSearchStore.setLastSearches(KlevuLastSearches.get())

    if (quickSearchStore.trendingProducts.length > 0) {
        return
    }

    const res = await KlevuFetch(
        trendingProducts({ limit: 9 })
    )
    quickSearchStore.setTrendingProducts(res.queriesById('trendingProducts').records ?? [])
}

const clearSearchResults = () => {
    quickSearchStore.setProducts([])
    quickSearchStore.setSuggestions([])
    quickSearchStore.setTrendingProducts([])
}

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
        result
            .suggestionsById("suggestions")
            .suggestions.map((i) => i.suggest) ?? []
    )
}

const debouncedSearchHandler = debounce(doSearch, 300)

const doSearchSubmit = function () {
    if (quickSearchStore.searchTerm.length > 0) {
        router.push({ path: '/search', query: { q: quickSearchStore.searchTerm } })
        closeQuickSearch()
    }
}

const closeQuickSearch = () => {
    quickSearchStore.quickSearchOpen = false
    quickSearchStore.searchTerm = ''
    clearSearchResults()
}

</script>

<template>
    <form @submit.prevent="doSearchSubmit" class="search-field">
        <svg
            class="absolute mt-1 mr-2 right-0"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                fill="gray"
            />
        </svg>
        <input
            class="block px-2 text-gray-500 text-sm w-16 md:w-32 h-full"
            placeholder="Search"
            type="text"
            @change="debouncedSearchHandler"
            @keyup="debouncedSearchHandler"
            @focus="doEmptySuggestions"
            v-model="quickSearchStore.searchTerm"
        />
    </form>
    <div class="quick-search" :class="{ open: quickSearchStore.quickSearchOpen }">
        <div
            class="text-center"
            v-if="!quickSearchStore.products.length && !quickSearchStore.trendingProducts.length"
        >Loading results...</div>
        <div
            v-if="quickSearchStore.products.length || quickSearchStore.trendingProducts.length"
            class="quick-search-close absolute right-0 mr-3"
        >
            <button @click="closeQuickSearch">
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
.search-field {
    @apply relative bg-white border w-24 md:w-40;
}
.quick-search {
    top: 50px;
    right: 10%;
    width: 80%;
    min-height: 50px;
    z-index: 10;
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