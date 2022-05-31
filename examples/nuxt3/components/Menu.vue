<template>
  <div class="navbar bg-base-100 drop-shadow-md">
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

const cartStore = useCart()

const categories = [
  { link: "/collections/Men", title: "Men", icon: IconsMan },
  { link: "/collections/Women", title: "Women", icon: IconsWoman },
  { link: "/collections/men;shoes", title: "Men's Shoes", icon: IconsManShoe },
]
</script>

<style scoped>
.navbar {
  z-index: 9;
}
</style>
