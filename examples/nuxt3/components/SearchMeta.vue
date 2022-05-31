<template>
  <div class="navbar bg-primary text-primary-content">
    <button
      @click="searchStore.filtersOpen = !searchStore.filtersOpen"
      class="btn btn-ghost normal-case text-xl"
    >
      <IconsFilter class="fill-white mr-2" /> Show Filters
    </button>
  </div>
</template>

<script setup>
import useSearch from "../stores/searchStore.js"

const searchStore = useSearch()
</script>
