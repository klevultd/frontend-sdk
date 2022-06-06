<template>
  <div class="navbar bg-primary text-primary-content" style="height: 64px">
    <div class="flex-1 px-2 lg:flex-none">
      <button
        @click="searchStore.filtersOpen = !searchStore.filtersOpen"
        class="btn glass normal-case"
      >
        <IconsFilter class="fill-white mr-2" /> Show Filters
      </button>
    </div>
    <div class="flex justify-end flex-1 px-2">
      <div class="flex items-stretch">
        <div class="dropdown dropdown-end">
          Sort By:
          <label
            tabindex="0"
            id="sortTrigger"
            class="btn glass rounded-btn normal-case"
            >{{ sortTitles[searchStore.sorting] }}</label
          >
          <ul
            tabindex="0"
            class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 text-primary"
          >
            <li @click="setSorting(KlevuSearchSorting.Relevance)">
              {{ sortTitles[KlevuSearchSorting.Relevance] }}
            </li>
            <li @click="setSorting(KlevuSearchSorting.PriceAsc)">
              {{ sortTitles[KlevuSearchSorting.PriceAsc] }}
            </li>
            <li @click="setSorting(KlevuSearchSorting.PriceDesc)">
              {{ sortTitles[KlevuSearchSorting.PriceDesc] }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { KlevuSearchSorting } from "@klevu/core"
import useSearch from "../stores/searchStore.js"

const searchStore = useSearch()
let sortTrigger

const setSorting = (sorting) => {
  searchStore.sorting = sorting
  updateSort()
}
const updateSort = async () => {
  await nextTick()
  console.log(
    `handle sort update here: ${sortTrigger.innerText}; which is ${searchStore.sorting}`
  )
  if (searchStore.searchFn) searchStore.searchFn()
}
const sortTitles = {
  RELEVANCE: "Relevance",
  PRICE_ASC: "Price Low to High",
  PRICE_DESC: "Price High to Low",
}

onMounted(() => {
  sortTrigger = document.getElementById("sortTrigger")
})
</script>

<style scoped>
.navbar .dropdown li {
  @apply py-2 px-4 cursor-pointer;
}
</style>
