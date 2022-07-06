<script setup lang="ts">
import "@klevu/ui/style.css"
import "@klevu/ui/init.js"
import "@klevu/ui/quicksearch.js"
import { ref, onMounted, defineComponent, createApp } from "vue"
import { useRouter } from "vue-router"

import Product from "../components/Product.vue"

const router = useRouter()

const klevu = ref<any>(null)
const klevu2 = ref<any>(null)
onMounted(() => {
  // example 1. Render vue component inside web component
  const instance = defineComponent({
    extends: Product,
  })

  klevu.value.renderProduct = (record, onclick) => {
    const div = document.createElement("div")
    createApp(instance, {
      product: record,
      classes: "p-2",
    }).mount(div)
    return div
  }

  // example 2. Add click event to web component version
  klevu2.value.addEventListener("klevu-product-click", (event: CustomEvent) => {
    router.push(`/product/${event.detail.record.id}`)
  })
})
</script>

<template>
  <div style="min-height: 100vh; padding: 16px">
    <klevu-init
      url="https://eucs23v2.ksearchnet.com/cs/v2/search"
      apiKey="klevu-160320037354512854"
    ></klevu-init>
    <h1>With custom product render</h1>
    <p>
      Problematic solution since none of the styles can come from from original
      app
    </p>
    <klevu-quicksearch ref="klevu"></klevu-quicksearch>

    <h1 style="margin-top: 2em">Without any modifications</h1>
    <klevu-quicksearch ref="klevu2"></klevu-quicksearch>
  </div>
</template>

<style scoped></style>
