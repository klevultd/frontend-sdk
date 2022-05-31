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
/*
if (props.product.totalVariants) {
    console.log(props.product.name, props.product.totalVariants)
    const rawSwatchesInfo = props.product.swatchesInfo.split(';;;;')
    rawSwatchesInfo.forEach(si => {
        const [first, ...rest] = si.split(':')
        const last = rest.join(':')
        console.log(first.trim(), last.trim())
    })
}
*/
</script>

<template>
  <div :class="[classes]">
    <router-link
      :to="`/products/${product.id}`"
      @click="clickHandler"
      class="block relative h-48 rounded overflow-hidden"
    >
      <img
        :alt="product.name"
        class="object-cover object-center w-full h-full block"
        :src="product.imageUrl"
      />
    </router-link>

    <div class="mt-4">
      <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
        {{ product.type }}
      </h3>
      <router-link :to="`/products/${product.id}`" @click="clickHandler">
        <h2 class="text-gray-900 title-font text-lg font-medium">
          {{ product.name }}
        </h2>
      </router-link>
      <p class="mt-1">
        {{
          new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: product.currency,
          }).format(product.price)
        }}
      </p>
    </div>
  </div>
</template>

<style scoped>
a {
  @apply flex flex-col h-full;
}
.product-image {
  @apply flex justify-center items-start;
  flex-grow: 1;
}
</style>
