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
    <trinity-rings-spinner
      v-if="quickSearchStore.loading"
      class="mx-auto my-12"
      :animation-duration="1500"
      :size="60"
      color="#97C73E"
    />
  </div>
</template>

<script setup>
import useQuickSearch from "../stores/quickSearchStore"
import { TrinityRingsSpinner } from "epic-spinners"

const quickSearchStore = useQuickSearch()
</script>

<style scoped>
.quick-search-results .top-results {
  @apply lg:w-1/4 p-3;
}
.quick-search-results .bottom-results {
  @apply lg:w-3/4 p-3 overflow-y-auto;
}
</style>
