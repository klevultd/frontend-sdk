<script setup>
import { computed } from "vue"
import useSearch from "../state/searchStore"
import Product from "../components/Product.vue"
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel"
import "vue3-carousel/dist/carousel.css"

const searchStore = useSearch()
const props = defineProps({
  title: String,
})
const emit = defineEmits(["productClick"])
const recommendationClickHandler = function (product, index) {
  emit("productClick", product, index)
}

const numOfRecs = computed(() => {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )
  if (vw >= 1024) {
    return 4
  } else if (vw > 768) {
    return 3
  } else {
    return 2
  }
})
</script>

<template>
  <div class="pt-12 pb-6 text-center text-lg font-bold uppercase">
    {{ title }}
  </div>
  <div class="recommendations-wrapper">
    <carousel :items-to-show="numOfRecs">
      <slide
        v-for="(rec, index) in searchStore.similarProducts"
        :key="'rec' + index"
      >
        <Product
          classes="carousel__item"
          :product="rec"
          @clickHandler="recommendationClickHandler(rec, index)"
        />
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<style>
.recommendations-wrapper {
  @apply pb-12 px-6 mx-auto;
}
.carousel {
  @apply flex-col;
}
.carousel__prev--in-active,
.carousel__next--in-active {
  display: none;
}
.carousel__next {
  right: 15px;
}
.carousel__prev {
  left: 15px;
}
:root {
  --vc-nav-background-color: rgb(29 78 216 / 1);
}
</style>
