<template>
  <div
    class="last-searches min-w-[320px]"
    v-if="quickSearchStore.lastSearches.length > 0"
  >
    <h3>Last Searches</h3>
    <div class="search-list">
      <div
        class="search"
        v-for="search in quickSearchStore.lastSearches"
        :key="search.timestamp"
      >
        <a :href="`/search?q=${search.term}`">{{ search.term }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import useQuickSearch from "../stores/quickSearchStore"
const quickSearchStore = useQuickSearch()
</script>
