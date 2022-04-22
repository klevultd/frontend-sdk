<script setup>
import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import useCart from '../state/cartStore';
import useSearch from '../state/searchStore';
import { KlevuFetch, products as getProducts, similarProducts } from "@klevu/core"

const searchStore = useSearch();
const cartStore = useCart();
const route = useRoute()

searchStore.setProducts([])

const fetchProduct = async function () {
  const res = await KlevuFetch(getProducts([route.params.id]))
  searchStore.setProducts(res.queriesById("products")?.records ?? [])

  //const similarRes = await KlevuFetch(similarProducts([product]))

  //setSimilar(similarRes.queriesById("similar")?.records)
}

const addToCart = function () {
  cartStore.addProduct(searchStore.products[0], 1)
}

fetchProduct()

</script>

<template>
  <div v-for="product in searchStore.products" :key="product.id" class="product-page-wrapper">
    <div class="product-wrapper flex flex-col lg:flex-row">
      <div class="product-image lg:p-20 lg:w-1/2 flex justify-center lg:justify-end items-center">
        <img :src="product.imageUrl.toString().replace('_medium', '')">
      </div>
      <div class="lg:p-20 lg:w-1/2">
        <div class="px-6 max-w-xs mx-auto md:max-w-lg">
          <h2 class="text-xl pb-3">{{ product.name }}</h2>
          <div class="pb-3">{{
            new Intl.NumberFormat(undefined, {
              style: 'currency', currency: product.currency
            }).format(product.price)
          }}</div>
          <div class="pb-3">{{ product.shortDesc }}</div>
          <div class="pb-3">
            <button @click="addToCart" class="btn block mx-auto">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-image img {
  max-width: 60%;
  @apply p-3 m-3 border;
}
</style>