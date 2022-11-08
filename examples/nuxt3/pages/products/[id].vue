<template>
  <div>
    <div
      v-for="product in searchStore.products"
      :key="product.id"
      class="product-page-wrapper"
    >
      <div class="product-wrapper flex flex-col lg:flex-row">
        <div
          class="product-image lg:pt-10 lg:pl-20 lg:pr-10 lg:w-1/2 flex justify-center lg:justify-end items-center"
        >
          <img
            class="validateImage"
            src="/No-Image-Placeholder.svg"
            :data-src="product.imageUrl.toString()"
          />
        </div>
        <div class="lg:py-24 lg:pl-0 lg:pr-20 lg:w-1/2">
          <div class="px-6 max-w-xs mx-auto md:max-w-lg">
            <h2 class="text-xl pb-3">{{ product.name }}</h2>
            <div class="pb-6">{{ product.shortDesc }}</div>
            <div class="pb-6">
              {{ getPrice(product) }}
            </div>
            <div class="pb-3">
              <div class="flex items-end">
                <div class="quantity-slider w-1/2 pr-3 form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text">Quantity</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    class="range range-primary"
                    step="1"
                    v-model="quantity"
                  />
                  <div class="w-full flex justify-between text-xs px-2">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
                <button
                  @click="debounceAddToCart"
                  class="btn block bg-primary border-0 hover:bg-secondary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Recommendations
      title="Similar products"
      @productClick="recommendationClickHandler"
    />
  </div>
</template>

<script setup>
import {
  KlevuFetch,
  products as getProducts,
  similarProducts,
  KlevuEvents,
  KMCRecommendationLogic,
} from "@klevu/core"
import useSearch from "../../stores/searchStore"
import useCart from "../../stores/cartStore"

const route = useRoute()
const searchStore = useSearch()
const cartStore = useCart()

const quantity = ref(1)
const getPrice = (product) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: product.currency,
  }).format(product.price * quantity.value)
}

searchStore.setProducts([])
searchStore.setSimilar([])

onUpdated(() => {
  useNuxtApp().$validateImages()
})

const fetchProduct = async function () {
  searchStore.clearSearchResults()
  const res = await KlevuFetch(
    getProducts([route.params.id]),
    similarProducts([route.params.id])
  )

  searchStore.loading = false

  searchStore.setProducts(res.queriesById("products")?.records ?? [])
  searchStore.setSimilar(res.queriesById("similar")?.records ?? [])

  await nextTick()
}

const recommendationClickHandler = function (product, index) {
  KlevuEvents.recommendationClick(
    {
      recsKey: "product-similar",
      logic: KMCRecommendationLogic.Similar,
      title: "Similar products",
    },
    product,
    index
  )
}

const addToCart = function () {
  cartStore.snackbar(
    "Success",
    `${quantity.value} item${
      Number(quantity.value) > 1 ? "s" : ""
    } have been added.`
  )
  cartStore.addProduct(searchStore.products[0], Number(quantity.value))
}

const debounceAddToCart = useDebounceFn(addToCart, 1000)

fetchProduct()
</script>

<style scoped>
.product-image img {
  max-width: 60%;
  @apply p-3 m-3 border;
}
</style>
