<template>
  <div class="slideout-cart-wrapper">
    <div class="slideout-cart-close" @click="cartStore.open = false">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <h2>YOUR BASKET</h2>
    <div v-if="cartStore.products.length">
      <div v-for="item in cartStore.products" :key="item.product.id">
        <div class="product-wrapper">
          <div class="product-image">
            <img :src="item.product.image" alt="" />
          </div>
          <div class="product-title-price">
            <div>{{ item.product.name }}</div>
            <div>
              {{
                new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: item.product.currency,
                }).format(item.product.price)
              }}
            </div>
          </div>
          <div class="product-quantity">{{ item.amount }}</div>
          <div class="product-total h-full">
            {{
              new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: item.product.currency,
              }).format(item.product.price * item.amount)
            }}
          </div>
          <div class="product-remove" @click="removeProduct(item.product)">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                fill="currentColor"
              />
              <path d="M9 9H11V17H9V9Z" fill="currentColor" />
              <path d="M13 9H15V17H13V9Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
      <div class="subtotal m-6 text-gray-700">
        Basket Subtotal: {{ cartStore.subtotal }}
      </div>
      <button @click="checkout" class="block btn mx-auto">CHECKOUT</button>
    </div>
    <div v-else class="text-gray-300 text-center">
      <div class="text-gray-200">
        <IconsCart width="150" />
      </div>
      <div>No products in shopping basket</div>
    </div>
  </div>
</template>

<script setup>
import useCart from "../stores/cartStore"

const cartStore = useCart()
const removeProduct = function (product) {
  cartStore.removeProduct(product)
}
const checkout = () => {
  cartStore.buy()
}
</script>

<style scoped>
.product-wrapper {
  @apply flex justify-start items-start text-sm py-3;
}

.product-image {
  @apply p-3 pt-0;
}

.product-image img {
  @apply w-12;
}

.product-quantity,
.product-remove {
  @apply px-3;
}

.product-total {
  white-space: nowrap;
  @apply pr-3;
}

.slideout-cart-close {
  @apply absolute top-0 right-0 m-6;
}
</style>
