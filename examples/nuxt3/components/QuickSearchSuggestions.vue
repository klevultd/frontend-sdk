<template>
  <div class="suggestions" v-if="quickSearchStore.suggestions.length > 0">
    <h3>Suggestions</h3>
    <div class="suggestion-results">
      <router-link
        v-for="(suggestion, index) in quickSearchStore.suggestions"
        class="block"
        :key="index"
        :to="`/search?q=${suggestion.replace(/<[^>]*>?/gm, '')}`"
        v-html="suggestion"
      />
    </div>
  </div>
</template>

<script setup>
import useQuickSearch from "../stores/quickSearchStore"
const quickSearchStore = useQuickSearch()
</script>
