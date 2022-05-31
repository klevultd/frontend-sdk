<template>
  <div>seach page {{ $route.path.substring(1).split("/") }}</div>
</template>

<script setup>
import { ref } from "vue"
import { onBeforeRouteUpdate } from "vue-router"
import useSearch from "../stores/searchStore"
import useQuickSearch from "../stores/quickSearchStore"
import Product from "../components/Product.vue"
import Option from "../components/Option.vue"
import Slider from "../components/Slider.vue"
import FacetToggle from "../components/FacetToggle.vue"
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
</script>
