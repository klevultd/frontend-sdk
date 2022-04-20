<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import useCart from '../state/cartStore';
import { KlevuFetch, products, similarProducts } from "@klevu/core"

const cartStore = useCart();
const route = useRoute()

defineProps({
  msg: String
})

const Products = []

const fetchProduct = async function() {
    const res = await KlevuFetch(products([route.params.id]))
    Products.push(res.queriesById("products")?.records?.[0])
    console.log(Products)
    //setProduct(product)

    //const similarRes = await KlevuFetch(similarProducts([product]))

    //setSimilar(similarRes.queriesById("similar")?.records)
}

fetchProduct()

const count = ref(0)
</script>

<template>
  <div v-for="product in Products" :key="product.id" class="product-page-wrapper">
    <div class="product-wrapper flex flex-col lg:flex-row">
      <div class="product-image lg:p-20 lg:w-1/2 flex justify-end items-center">
        <img :src="product.imageUrl.toString().replace('_medium', '')">
      </div>
      <div class="lg:p-20 lg:w-1/2">
        <div>
          <h2 class="text-xl pb-3">{{ product.name }}</h2>
          <div class="pb-3">{{ new Intl.NumberFormat(undefined, { style: 'currency', currency: product.currency }).format(product.price) }}</div>
          <div class="pb-3">{{ product.shortDesc }}</div>
        </div>
      </div>
    </div>
    <!-- this is the product page "{{ $route.params.id }}" -->
  </div>
</template>

<style scoped>
.product-image img {
  max-width: 60%;
}
</style>