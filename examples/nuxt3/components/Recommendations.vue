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

<script setup>
import useSearch from "../stores/searchStore"
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel"
import "vue3-carousel/dist/carousel.css"
// import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  tablet: 768,
  laptop: 1024,
})
const searchStore = useSearch()
const props = defineProps({
  title: String,
})
const emit = defineEmits(["productClick"])
const recommendationClickHandler = function (product, index) {
  // emit("productClick", product, index)
}

const numOfRecs = computed(() => {
  if (breakpoints.greater("laptop")) {
    return 4
  } else if (breakpoints.greater("tablet")) {
    return 3
  } else {
    return 2
  }
})
</script>

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
  --vc-nav-background-color: #97c73e;
  --vc-pgn-background-color: #97c73e;
  --vc-pgn-active-color: #6a9c0d;
}
</style>
