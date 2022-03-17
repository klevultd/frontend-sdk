<script setup>
import {
  KlevuRecord,
  KlevuSearchSorting,
  listFilters,
  applyFilterWithManager,
  KlevuFetch,
  KlevuDomEvents,
  FilterManager,
  categoryMerchandising,
  KlevuFilterResultOptions,
  KlevuFilterResultSlider,
  KlevuFetchResponse,
} from "@klevu/core"

const searchStore = useSearch();
const manager = new FilterManager()
let prevRes;
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const openFacets = ref(vw >= 1024 ? true : false);


</script>

<template>
  <div>this is the collections page "{{ $route.params.id }}"</div>
</template>