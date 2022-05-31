<template>
  <section v-if="quickSearchStore.products.length" class="body-font">
    <h3>Products</h3>
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
        <Product
          v-for="(product, index) in quickSearchStore.products"
          :key="index"
          :product="product"
          @clickHandler="productClick"
          classes="p-4 w-full"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import useQuickSearch from "../stores/quickSearchStore"
import { KlevuEvents } from "@klevu/core"
const quickSearchStore = useQuickSearch()

const productClick = (product) => {
  KlevuEvents.searchProductClick(product, quickSearchStore.searchTerm)
}
</script>
