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
      <NuxtPage :key="route.fullPath" />
    </NuxtLayout>
  </Body>
</template>

<script setup>
import useCart from "./stores/cartStore"
import useSearch from "./stores/searchStore.js"
import useQuickSearch from "./stores/quickSearchStore"

const route = useRoute()
const cartStore = useCart()
const searchStore = useSearch()
const quickSearchStore = useQuickSearch()
</script>
