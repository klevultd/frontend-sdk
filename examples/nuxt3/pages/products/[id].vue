<template>
  <div
    v-for="product in searchStore.products"
    :key="product.id"
    class="product-page-wrapper"
  >
    <div class="product-wrapper flex flex-col lg:flex-row">
      <div
        class="product-image lg:py-20 lg:pl-20 lg:pr-10 lg:w-1/2 flex justify-center lg:justify-end items-center"
      >
        <img :src="product.imageUrl.toString().replace('_medium', '')" />
      </div>
      <div class="lg:py-24 lg:pl-10 lg:pr-20 lg:w-1/2">
        <div class="px-6 max-w-xs mx-auto md:max-w-lg">
          <h2 class="text-xl pb-3">{{ product.name }}</h2>
          <div class="pb-6">
            {{
              new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: product.currency,
              }).format(product.price)
            }}
          </div>
          <div class="pb-6">{{ product.shortDesc }}</div>
          <div class="pb-3">
            <button
              @click="addToCart"
              class="btn block bg-primary border-0 hover:bg-secondary"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Recommendations
    title="Similar products"
    @productClick="recommendationClickHandler"
  />
</template>

<script setup>
import {
  KlevuFetch,
  products as getProducts,
  similarProducts,
  KMCRecommendationLogic,
  // KlevuConfig,
} from "@klevu/core"
import useSearch from "../../stores/searchStore"
import useCart from "../../stores/cartStore"
// const config = useRuntimeConfig()

// KlevuConfig.init({
//   url: config.klevuUrl,
//   apiKey: config.klevuApikey,
// })

const route = useRoute()
const searchStore = useSearch()
const cartStore = useCart()

searchStore.setProducts([])
searchStore.setSimilar([])

const fetchProduct = async function () {
  const res = await KlevuFetch(getProducts([route.params.id]))
  searchStore.setProducts(res.queriesById("products")?.records ?? [])

  const similarRes = await KlevuFetch(similarProducts([route.params.id]))

  searchStore.setSimilar(similarRes.queriesById("similar")?.records ?? [])
}

const addToCart = function () {
  cartStore.addProduct(searchStore.products[0], 1)
}

fetchProduct()
</script>

<style scoped>
.product-image img {
  max-width: 60%;
  @apply p-3 m-3 border;
}
</style>
