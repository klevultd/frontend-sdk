<template>
  <div class="snackbar" :class="{ show: cartStore.showSnackbar }">
    <div
      class="p-2 bg-secondary items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span
        class="flex rounded-full bg-primary uppercase px-2 py-1 text-xs font-bold mr-3"
        >{{ cartStore.snackbarType }}</span
      >
      <span class="font-semibold mr-2 text-left flex-auto">{{
        cartStore.snackbarMessage
      }}</span>
    </div>
  </div>
</template>

<script setup>
import useCart from "../stores/cartStore"
const cartStore = useCart()
</script>

<style scoped>
.snackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  z-index: 1; /* Add a z-index if needed */
  bottom: 15px; /* 30px from the bottom */
  @apply fixed w-full text-center py-4 lg:px-4;
}
.snackbar.show {
  visibility: visible; /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 15px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 15px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 15px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 15px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
