<script setup>
import { onBeforeRouteLeave } from 'vue-router'
import useSearch from '../state/searchStore';
import Product from '../components/Product.vue';
import Option from '../components/Option.vue';
import Slider from '../components/Slider.vue';
import {
  applyFilterWithManager,
  FilterManager,
  KlevuDomEvents,
  KlevuFetch,
  KlevuSearchSorting,
  listFilters,
  trendingProducts,
  //KlevuFetchResponse,
} from "@klevu/core";

const searchStore = useSearch();
const manager = new FilterManager();
let prevRes

const initialFetch = async () => {
  const functions = [
    trendingProducts(
      {
        id: "search",
        limit: 36,
        sort: searchStore.sorting,
      },
      listFilters({
        rangeFilterSettings: [
          {
            key: "klevu_price",
            minMax: true,
          },
        ],
        exclude: ["inventory_item_id", "rim_size", "category", "type"],
        filterManager: manager,
      }),
      applyFilterWithManager(manager)
    ),
  ]
  const res = await KlevuFetch(...functions)
  prevRes = res

  const searchResult = res.queriesById('search')
  if (!searchResult) {
    return
  }

  searchStore.showMore = Boolean(res.next)
  searchStore.setOptions(manager.options)
  searchStore.setSliders(manager.sliders)
  searchStore.setProducts(searchResult.records ?? [])
}

const fetchMore = async () => {
  const nextRes = await prevRes.next({
    filterManager: manager,
  })
  searchStore.setProducts([
    ...searchStore.products,
    ...(nextRes.queriesById('search').records ?? []),
  ])
  prevRes = nextRes
  searchStore.showMore = Boolean(nextRes.next)
}

const handleFilterUpdate = () => {
  searchStore.setOptions(manager.options)
  searchStore.setSliders(manager.sliders)
  initialFetch()
}

document.addEventListener(
  KlevuDomEvents.FilterSelectionUpdate,
  handleFilterUpdate
)

onBeforeRouteLeave((to, from, next) => {
  document.removeEventListener(
    KlevuDomEvents.FilterSelectionUpdate,
    handleFilterUpdate
  )
})
const updateSort = e => {
  searchStore.sorting = e.target.value
  initialFetch()
}
initialFetch()

</script>

<template>
  <div class="homepage-wrapper">
    <section class="filter-section">
      <div class="facets border p-6">
        <Option
          v-for="(option, index) in searchStore.options"
          :key="index"
          :option="option"
          :manager="manager"
        />
        <Slider
          v-for="(slider, index) in searchStore.sliders"
          :key="index"
          :slider="slider"
          :manager="manager"
        />
      </div>
    </section>
    <section class="results-section">
      <div class="sorting-options">
        <select class="border py-2 px-3" v-model="searchStore.sorting" @change="updateSort">
          <option :value="KlevuSearchSorting.Relevance">Relevance</option>
          <option :value="KlevuSearchSorting.PriceAsc">Price: Low to high</option>
          <option :value="KlevuSearchSorting.PriceDesc">Price: Hight to low</option>
        </select>
      </div>
      <div class="product-results">
        <Product
          v-for="product in searchStore.products"
          :key="product.id"
          :product="product"
          classes="p-2 md:w-1/3 lg:w-1/4 mb-5"
        />
        <div class="w-full" v-if="searchStore.showMore">
          <button class="border py-2 px-5 block w-32 mx-auto my-5" @click="fetchMore">Load more</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.homepage-wrapper {
  max-width: 1200px;
  @apply flex flex-col lg:flex-row mx-auto mt-6 mb-12;
}
.filter-section {
  @apply lg:w-1/4 mt-12;
}
.results-section {
  @apply lg:w-3/4;
}
.sorting-options {
  @apply px-6;
}
.product-results {
  max-width: 1000px;
  @apply lg:flex lg:flex-wrap mx-auto;
}
</style>
