<template>
  <div class="quick-search-results">
    <div class="top-results" v-if="!quickSearchStore.loading">
      <QuickSearchSuggestions />
      <QuickSearchLastSearches />
    </div>
    <div class="bottom-results" v-if="!quickSearchStore.loading">
      <QuickSearchProducts />
      <QuickSearchTrendingProducts />
    </div>
  </div>
</template>

<script setup>
import useQuickSearch from "../stores/quickSearchStore"

const quickSearchStore = useQuickSearch()

onUpdated(() => {
  useNuxtApp().$validateImages()
})
</script>

<style scoped>
.quick-search-results .top-results {
  @apply lg:w-1/4 p-3;
}
.quick-search-results .bottom-results {
  @apply lg:w-3/4 p-3 overflow-y-auto;
}
</style>
