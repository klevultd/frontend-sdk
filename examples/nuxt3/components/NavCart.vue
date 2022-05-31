<template>
  <div @click="showCart" class="cartIconTrigger indicator mx-3">
    <span class="indicator-item badge badge-primary -mt-1">{{
      cartTotal
    }}</span>
    <IconsCart />
  </div>
</template>

<script setup>
import { computed } from "vue"
import useCart from "../stores/cartStore"

const cartStore = useCart()
const cartTotal = computed(() => {
  return cartStore.products.reduce((qty, item) => qty + item.amount, 0)
})

const showCart = () => {
  cartStore.open = true
  console.log("cart icon clicked")
}
</script>

<style scoped>
.cartIconTrigger {
  @apply cursor-pointer;
}
</style>
