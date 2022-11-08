<template>
  <div>
    <div
      class="loading-message"
      v-show="!searchStore.products.length && !searchStore.loading"
    >
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
            classes="p-2 mx-auto max-w-[300px] md:mx-0 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-5"
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
import useSearch from "../../stores/searchStore"
import {
  listFilters,
  applyFilterWithManager,
  KlevuFetch,
  KlevuDomEvents,
  sendMerchandisingViewEvent,
  FilterManager,
  categoryMerchandising,
  kmcRecommendation,
  sendRecommendationViewEvent,
} from "@klevu/core"

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

const searchStore = useSearch()
const route = useRoute()
const manager = new FilterManager()
let prevRes
let productClickManager
let recommendationClickManager

const initialFetch = async () => {
  searchStore.clearSearchResults()
  await nextTick()
  searchStore.loading = true

  const res = await KlevuFetch(
    categoryMerchandising(
      route.params.handle,
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
      sendMerchandisingViewEvent(route.params.handle)
    ),
    kmcRecommendation(
      "k-c0013603-1783-4293-bf80-7b3002587dcb",
      {
        categoryPath: route.params.handle,
        id: "recommendation",
      },
      sendRecommendationViewEvent("Category product recommendations")
    )
  )

  searchStore.loading = false

  const searchResult = res.queriesById("search")
  const recommendationResult = res.queriesById("recommendation")

  if (!searchResult) {
    return
  }
  prevRes = searchResult

  productClickManager = searchResult.getCategoryMerchandisingClickSendEvent()

  searchStore.showMore = Boolean(searchResult.next)
  searchStore.setOptions(manager.options)
  searchStore.setSliders(manager.sliders)
  searchStore.setProducts(searchResult.records ?? [])

  searchStore.managerOptionToggleFn = manager.toggleOption
  searchStore.managerUpdateSlideFn = manager.updateSlide

  if (recommendationResult) {
    recommendationClickManager =
      recommendationResult.getRecommendationClickSendEvent()

    searchStore.setRecommendationProducts(recommendationResult.records ?? [])
  }
  await nextTick()
}

searchStore.searchFn = initialFetch

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

const productClickHandler = (id) => {
  productClickManager(id, route.params.id)
}

initialFetch()
</script>
