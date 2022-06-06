<template>
  <div class="navbar bg-base-100 drop-shadow-md" style="height: 64px">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="text-left menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <NuxtLink to="/">
              <img
                src="/cropped-klevu-icon-32x32.png"
                alt="Klevu logo"
                class="w-4"
              />
              Home
            </NuxtLink>
          </li>
          <li v-for="(category, index) in categories" :key="index">
            <NuxtLink :to="category.link" class="">
              <component :is="category.icon" class="w-4" />
              {{ category.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <NuxtLink to="/" class="hidden md:flex">
        <img src="/logo-green.png" alt="Klevu logo" />
      </NuxtLink>
    </div>
    <div class="navbar-center hidden md:flex">
      <ul class="menu menu-horizontal p-0">
        <li v-for="(category, index) in categories" :key="index">
          <NuxtLink :to="category.link"
            ><component :is="category.icon" class="w-5" />
            {{ category.title }}</NuxtLink
          >
        </li>
      </ul>
      <ul :class="{ hidden: !isDev }">
        <button @click="fetchCategories">Show categories</button>
      </ul>
    </div>
    <div class="navbar-end">
      <QuickSearch />
      <NavCart />
    </div>
  </div>
</template>

<script setup>
import IconsMan from "./icons/Man.vue"
import IconsWoman from "./icons/Woman.vue"
import IconsManShoe from "./icons/ManShoe.vue"
import useCart from "../stores/cartStore"
import useSearch from "../stores/searchStore"
import { KlevuFetch, search } from "@klevu/core"

const cartStore = useCart()
const searchStore = useSearch()
const allCategories = []
let prevRes

const isDev = ref(false)

const categories = [
  { link: "/collections/Men", title: "Men", icon: IconsMan },
  { link: "/collections/Women", title: "Women", icon: IconsWoman },
  { link: "/collections/men;shoes", title: "Men's Shoes", icon: IconsManShoe },
]

const structureCategories = () => {
  const newcats = allCategories.map((cat) => ({
    // name: cat.name,
    // url: cat.url,
    klevu_category: cat.klevu_category,
    image: cat.image,
    imageUrl: cat.imageUrl,
  }))
  console.log(newcats)
}

const fetchCategories = async () => {
  const res = await KlevuFetch(
    search("*", {
      id: "categories",
      limit: 400,
      sort: searchStore.sorting,
      typeOfRecords: ["KLEVU_CATEGORY"],
    })
  )
  const searchResult = res.queriesById("categories")
  if (!searchResult || !searchResult.records.length) {
    return
  }

  console.log(searchResult)

  allCategories.push(...searchResult.records)

  if (Boolean(searchResult.next)) {
    prevRes = searchResult
    fetchMoreCategories()
  } else {
    structureCategories(allCategories)
  }
}

const fetchMoreCategories = async () => {
  const nextRes = await prevRes.next()
  const searchResult = nextRes.queriesById("categories")

  if (!searchResult || !searchResult.records.length) {
    return
  }

  console.log(searchResult)

  allCategories.push(...searchResult.records)

  if (Boolean(searchResult.next)) {
    prevRes = searchResult
    fetchMoreCategories()
  } else {
    structureCategories(allCategories)
  }
}
</script>

<style scoped>
.navbar {
  z-index: 9;
}
</style>
