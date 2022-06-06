<template>
  <div
    class="last-searches min-w-[320px] mb-6"
    v-if="quickSearchStore.lastSearches.length > 0"
  >
    <h3>Last Searches</h3>
    <div class="search-list">
      <div
        class="search"
        v-for="search in quickSearchStore.lastSearches"
        :key="search.timestamp"
      >
        <NuxtLink
          class="text-gray-700 hover:text-primary"
          :to="`/search?q=${search.term}`"
          @click="setSearchTerm"
          >{{ search.term }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import useQuickSearch from "../stores/quickSearchStore"
import useSearch from "../stores/searchStore"
const quickSearchStore = useQuickSearch()
const searchStore = useSearch()

const setSearchTerm = (event) => {
  console.log(event.target.innerText)
  // searchStore.searchTerm =
}
</script>
