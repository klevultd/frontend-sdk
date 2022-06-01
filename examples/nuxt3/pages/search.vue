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
    </div>
  </div>
</template>

<script setup>
import useSearch from "../stores/searchStore"
import {
  applyFilterWithManager,
  FilterManager,
  KlevuDomEvents,
  KlevuEvents,
  KlevuFetch,
  KlevuSearchSorting,
  listFilters,
  trendingProducts,
} from "@klevu/core"

definePageMeta({
  layout: "search-results",
})

const searchStore = useSearch()
const route = useRoute()
const pending = ref(true)
const { data } = await $fetch("/api/search/" + route.query.q)
pending.value = false

let manager = {}

if (data && data.products && data.products.length) {
  searchStore.setProducts(data.products)
  searchStore.showMore = data.showMore
}
</script>
