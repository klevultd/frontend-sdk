<template>
  <div>
    <div class="loading-message" v-show="!searchStore.products.length">
      Loading products...
    </div>
    <div class="collection-wrapper" v-show="searchStore.products.length">
      <section class="results-section mt-10 mb-24">
        <div
          class="product-results flex flex-wrap items-start mx-auto xl:max-w-[1000px]"
        >
          <Product
            v-for="product in searchStore.products"
            :key="product.id"
            :product="product"
            @click="productClickHandler(product.id)"
            classes="p-2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-5"
          />
          <div class="w-full text-center" v-if="searchStore.showMore">
            <button class="btn" @click="fetchMore">Load more</button>
          </div>
        </div>
      </section>
      <!-- <div>
      {{ $route.params.handle }}
      {{ $route.path.substring(1).split("/") }}
    </div> -->
    </div>
  </div>
</template>

<script setup>
import useSearch from "../../stores/searchStore"

definePageMeta({
  layout: "search-results",
})

const searchStore = useSearch()
const route = useRoute()
const pending = ref(true)
const { data } = await $fetch("/api/collections/" + route.params.handle)
pending.value = false

let manager = {}

if (data && data.products && data.products.length) {
  searchStore.setProducts(data.products)
  searchStore.showMore = data.showMore
}
// console.log(data)
</script>
