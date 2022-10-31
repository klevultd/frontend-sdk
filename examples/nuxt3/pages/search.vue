<template>
  <div>
    <div
      class="loading-message"
      v-show="!searchStore.products.length && !searchStore.loading"
    >
      No products found.
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
import {
  applyFilterWithManager,
  FilterManager,
  KlevuDomEvents,
  KlevuEvents,
  KlevuFetch,
  listFilters,
  search,
  sendSearchEvent,
} from "@klevu/core"
import useSearch from "../stores/searchStore"

const searchStore = useSearch()
const route = useRoute()
const nuxtApp = useNuxtApp()


const manager = new FilterManager()
let resultObject
let prevRes

definePageMeta({
  layout: "search-results",
})

onMounted(() => {
  document.addEventListener(KlevuDomEvents.FilterSelectionUpdate, initialFetch)
})

onUpdated(() => {
  useNuxtApp().$validateImages()
})

onBeforeUnmount(() => {
  document.removeEventListener(
    KlevuDomEvents.FilterSelectionUpdate,
    initialFetch
  )
})

const initialFetch = async () => {
  searchStore.clearSearchResults()
  await nextTick()
  searchStore.loading = true

  const res = await KlevuFetch(
    search(
      route.query.q,
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
        exclude: searchStore.searchFilterExcludes,
        filterManager: manager,
      }),
      applyFilterWithManager(manager),
      sendSearchEvent()
    )
  )

  searchStore.loading = false

  const searchResult = res.queriesById("search")
  if (!searchResult) {
    return
  }
  prevRes = searchResult

  searchStore.showMore = Boolean(searchResult.next)
  searchStore.setOptions(manager.options)
  searchStore.setSliders(manager.sliders)
  searchStore.setProducts(searchResult.records ?? [])

  searchStore.managerOptionToggleFn = manager.toggleOption
  searchStore.managerUpdateSlideFn = manager.updateSlide
  await nextTick()
}

const fetchMore = async () => {
  const nextRes = await prevRes.next({
    filterManager: manager,
  })
  const searchResult = nextRes.queriesById("search")
  searchStore.setProducts([
    ...searchStore.products,
    ...(searchResult.records ?? []),
  ])
  prevRes = searchResult
  searchStore.showMore = Boolean(searchResult.next)
}

searchStore.searchFn = initialFetch

const productClick = function (product) {
  KlevuEvents.searchProductClick(product, props.searchTerm)
}

initialFetch()
</script>
