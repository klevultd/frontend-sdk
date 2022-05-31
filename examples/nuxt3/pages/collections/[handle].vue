<template>
  <div>collection page</div>
</template>

<script setup>
const route = useRoute()
console.log(route.path)
const { data } = await useFetch("/api/collections/" + route.params.handle)

console.log(data.ret)
</script>
