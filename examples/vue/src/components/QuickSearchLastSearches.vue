<script setup>
import useQuickSearch from '../state/quickSearchStore'
const quickSearchStore = useQuickSearch()

</script>

<template>
    <div class="last-searches" v-if="quickSearchStore.lastSearches.length > 0">
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

<style scoped>
</style>