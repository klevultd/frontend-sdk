<script setup>
const props = defineProps({
    searchTerm: String
})
</script>

<template>
    <div>this is the search page and the search was {{ searchTerm }}</div>
</template>
