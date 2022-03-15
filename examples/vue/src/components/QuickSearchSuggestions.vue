<script setup>
import useSearch from '../state/searchStore'
const searchStore = useSearch()

</script>

<template>
    <div class="suggestions" v-if="searchStore.suggestions.length > 0">
        <h3>Suggestions</h3>
        <div class="suggestion-results">
            <router-link
                v-for="(suggestion, index) in searchStore.suggestions"
                class="block"
                :key="index"
                :to="(`/search?q=${suggestion.replace(/<[^>]*>?/gm, '')}`)"
                v-html="suggestion"
            />
        </div>
    </div>
</template>

<style scoped>
</style>