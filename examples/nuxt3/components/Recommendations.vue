<template>
  <div class="recommendations-wrapper">
    <div
      v-if="searchStore.similarProducts.length"
      class="pt-12 pb-6 text-center text-lg font-bold uppercase"
    >
      {{ title }}
    </div>
    <Carousel :items-to-show="numOfRecs">
      <Slide
        v-for="(rec, index) in searchStore.similarProducts"
        :key="'rec' + index"
      >
        <Product
          classes="carousel__item"
          :product="rec"
          @clickHandler="recommendationClickHandler(rec, index)"
        />
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import useSearch from "../stores/searchStore"
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel"
import "vue3-carousel/dist/carousel.css"

const breakpoints = useBreakpoints({
  tablet: 768,
  laptop: 1024,
})
const xl = breakpoints.greater("laptop")
const laptop = breakpoints.greater("tablet")

const searchStore = useSearch()
const props = defineProps({
  title: String,
})
const emit = defineEmits(["klevuProductClick"])
const recommendationClickHandler = function (product, index) {
  emit("klevuProductClick", product, index)
}

const numOfRecs = computed(() => {
  if (xl.value) {
    return 4
  } else if (laptop.value) {
    return 3
  } else {
    return 2
  }
})
</script>

<style lang="scss">
.recommendations-wrapper {
  @apply pb-12 px-6 mx-auto;

  .carousel {
    @apply flex-col;

    .carousel__slide {
      @apply items-start;

      .carousel__item {
        @apply flex-grow p-2;

        a {
          max-width: 250px;
          @apply justify-center items-center mx-auto;
        }
      }
    }
  }
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
