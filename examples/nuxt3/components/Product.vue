<script setup>
const props = defineProps({
  product: Object,
  classes: String,
  clickHandler: Function,
})

const emit = defineEmits(["clickHandler"])

const clickHandler = function () {
  emit("clickHandler", props.product)
}

const displayPrice = computed(() => {
  if (
    false &&
    props.product.startPrice &&
    (props.product.startPrice < props.product.salePrice ||
      props.product.startPrice < props.product.price)
  ) {
    return `Starting at ${new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: props.product.currency,
    }).format(props.product.startPrice)}`
  } else {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: props.product.currency,
    }).format(props.product.price)
  }
})
</script>

<template>
  <div :class="[classes]">
    <router-link
      :to="`/products/${product.id}`"
      @click="clickHandler"
      class="items-center relative h-48 rounded overflow-hidden mx-auto"
    >
      <img
        :alt="product.name"
        class="border p-3 object-cover object-center w-full h-full block validateImage"
        src="/No-Image-Placeholder.svg"
        :data-src="product.imageUrl"
      />
    </router-link>

    <div class="mt-4 mx-3">
      <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
        {{ product.type }}
      </h3>
      <router-link :to="`/products/${product.id}`" @click="clickHandler">
        <h2
          class="whitespace-pre-line text-gray-900 title-font text-base lg:text-lg font-medium"
        >
          {{ product.name }}
        </h2>
      </router-link>
      <p class="text-sm lg:text-base">
        {{ displayPrice }}
      </p>
    </div>
  </div>
</template>

<style scoped>
a {
  @apply flex flex-col h-full;
}
.product-results img,
.treding-products-results img {
  @apply max-w-[200px] lg:max-w-[300px];
}
</style>
