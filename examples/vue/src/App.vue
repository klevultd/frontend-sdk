<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
//import Home from './components/Home.vue'
import { KlevuConfig } from "@klevu/core"
import Search from './components/Search.vue'

KlevuConfig.init({
  url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-160320037354512854",
})

</script>

<template>
  <navigation class="flex justify-between p-3 bg-blue-700 text-white align-center">
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/collection/mens">Mens</router-link>
      <router-link to="/collection/womens">Womens</router-link>
    </div>
    <Search />
  </navigation>
  <router-view />
</template>

<style scoped>
navigation .links a {
  @apply px-2;
}
</style>