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
  <nav class="flex justify-between p-3 bg-blue-700 text-white align-center">
    <div class="links">
      <router-link to="/">
        <img src="/cropped-klevu-icon-192x192.png" class="h-5 inline-block mb-1" />
      </router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/collection/mens">Mens</router-link>
      <router-link to="/collection/womens">Womens</router-link>
    </div>
    <Search />
  </nav>
  <router-view />
</template>

<style scoped>
nav .links a {
  @apply px-2;
}
</style>
