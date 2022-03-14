<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
//import Home from './components/Home.vue'
import useSearch from './state/searchStore'
const search = useSearch()

</script>

<template>
  <navigation class="flex justify-between p-3 bg-blue-700 text-white align-center">
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/collection/mens">Mens</router-link>
      <router-link to="/collection/womens">Womens</router-link>
    </div>
    <div class="search-field">
      <input
        class="border px-2 text-gray-500 text-sm"
        placeholder="search"
        type="text"
        v-model="search.searchTerm"
      />
    </div>
  </navigation>
  <router-view />
</template>

<style scoped>
navigation .links a {
  @apply px-2;
}
</style>