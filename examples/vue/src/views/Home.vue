<script setup>
import { ref, nextTick } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import useSearch from '../state/searchStore';
import Product from '../components/Product.vue';
import Option from '../components/Option.vue';
import Slider from '../components/Slider.vue';
import FacetToggle from '../components/FacetToggle.vue';
import {
  applyFilterWithManager,
  FilterManager,
  KlevuDomEvents,
  KlevuFetch,
  KlevuSearchSorting,
  listFilters,
  trendingProducts,
} from "@klevu/core";

const searchStore = useSearch();
const manager = new FilterManager();
let prevRes
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

searchStore.resetSearch()

const openFacets = ref(vw >= 1024 ? true : false);
const logOptions = (options) => {
  options.forEach(f => {
    const output = []
    const o = f.options.forEach(op => {
      if (op.selected) output.push([op.value, op.selected])
    })
    if (output.length) console.log(f.key, output.join('--'))
  })
}
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
        exclude: searchStore.homeFilterExcludes,
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

const handleFilterUpdate = async () => {
  searchStore.setProducts([])
  searchStore.setOptions(manager.options)
  searchStore.setSliders(manager.sliders)
  initialFetch()
}

console.log('loading FilterSelectionUpdate handler')
document.addEventListener(
  KlevuDomEvents.FilterSelectionUpdate,
  handleFilterUpdate
)

onBeforeRouteUpdate((to, from) => {
  console.log('unloading FilterSelectionUpdate handler')
  document.removeEventListener(
    KlevuDomEvents.FilterSelectionUpdate,
    handleFilterUpdate
  )
})

const toggleFacets = () => {
  openFacets.value = !openFacets.value
}

const updateSort = e => {
  searchStore.sorting = e.target.value
  initialFetch()
}

initialFetch()

</script>

<template>
  <div class="loading-message" v-show="!searchStore.products.length">Loading products...</div>
  <div class="homepage-wrapper" v-show="searchStore.products.length">
    <section class="filter-section">
      <div class="facets border p-6">
        <FacetToggle :handler="toggleFacets" :open="openFacets" :vw="vw" />
        <div v-show="openFacets">
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
          <button class="btn" @click="fetchMore">Load more</button>
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
  @apply px-5 lg:w-1/4 mt-12 w-96 mx-auto;
}
.facets {
  max-height: 1000px;
  overflow-y: auto;
  overflow-x: hidden;
}
.results-section {
  @apply mt-12 lg:mt-0 lg:w-3/4;
}
.sorting-options {
  @apply px-6 text-center lg:text-left pb-6 lg:pb-0;
}
.product-results {
  max-width: 1000px;
  @apply md:flex md:flex-wrap mx-auto;
}
</style>
