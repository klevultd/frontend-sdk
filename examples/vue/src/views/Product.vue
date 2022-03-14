<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <div>this is the product page "{{ $route.params.id }}"</div>
</template>