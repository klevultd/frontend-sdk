<template>
  <div @click="showCart" class="cartIconTrigger indicator mx-3">
    <span class="indicator-item badge badge-primary -mt-1">{{
      cartStore.cartTotalQuantity
    }}</span>
    <IconsCart />
  </div>
</template>

<script setup>
import useCart from "../stores/cartStore"

const cartStore = useCart()

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
