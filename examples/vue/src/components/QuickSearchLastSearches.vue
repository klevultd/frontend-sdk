<script setup>
import useSearch from '../state/searchStore'
const searchStore = useSearch()

</script>

<template>
    <div class="last-searches" v-if="searchStore.lastSearches.length > 0">
        <h3>Last Searches</h3>
        <div class="search-list">
            <div class="search" v-for="search in searchStore.lastSearches" :key="search.timestamp">
                <a :href="`/search?q=${search.term}`">{{ search.term }}</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>