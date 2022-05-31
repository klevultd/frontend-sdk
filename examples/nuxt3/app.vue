<template>
  <Body
    :class="{
      'overflow-x-hidden': true,
      'show-quick-search': quickSearchStore.quickSearchOpen,
      'show-quick-cart': cartStore.open,
      'show-search-filters': searchStore.filtersOpen,
    }"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<script setup>
import useCart from "./stores/cartStore"
import useSearch from "./stores/searchStore.js"
import useQuickSearch from "./stores/quickSearchStore"
import {
  KlevuFetch,
  KlevuTypeOfRecord,
  search,
  suggestions,
  trendingProducts,
  KlevuConfig,
} from "@klevu/core"

const cartStore = useCart()
const searchStore = useSearch()
const quickSearchStore = useQuickSearch()
const config = useRuntimeConfig()

KlevuConfig.init({
  url: config.klevuURL,
  apiKey: config.klevuAPI,
})
</script>
