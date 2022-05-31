<template>
  <div>
    {{ $route.params.handle }}
    {{ $route.path.substring(1).split("/") }}
  </div>
</template>

<script script>
definePageMeta({
  layout: "search-results",
})
</script>
