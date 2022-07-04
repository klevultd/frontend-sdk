<script setup>
import "@klevu/ui/style.css"
import "@klevu/ui/init.js"
import "@klevu/ui/quicksearch.js"
</script>

<template>
  <div style="min-height: 100vh">
    <klevu-init
      url="https://eucs23v2.ksearchnet.com/cs/v2/search"
      apiKey="klevu-160320037354512854"
    ></klevu-init>
    <klevu-quicksearch></klevu-quicksearch>
  </div>
</template>

<style scoped>
</style>