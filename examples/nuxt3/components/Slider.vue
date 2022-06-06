<script setup>
import MultiRangeSlider from "multi-range-slider-vue"
import "@/node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css"
import "@/node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css"
import debounce from "lodash.debounce"

const props = defineProps({
  slider: Object,
})
const realMax = 1 * props.slider.max
let minValue = 1 * props.slider.min
let maxValue = 1 * props.slider.max

const updateSliderValues = (e) => {
  minValue = e.minValue
  maxValue = e.maxValue

  searchStore.manager.updateSlide(props.slider.key, minValue, maxValue)
}
const debouncedUpdateSliderHandler = debounce(updateSliderValues, 300)
</script>

<template>
  <div class="slider-wrapper pb-4">
    <div class="slider-label ml-6 py-2 uppercase">
      {{ slider.label === "klevu_price" ? "Price" : slider.label }}
    </div>
    <div class="slider-inner-wrapper max-w-[300px] ml-8">
      <MultiRangeSlider
        baseClassName="multi-range-slider-bar-only"
        :minValue="minValue"
        :maxValue="maxValue"
        :max="realMax"
        :min="0"
        :step="1"
        :rangeMargin="10"
        @input="debouncedUpdateSliderHandler"
      />
    </div>
  </div>
</template>

<style scoped></style>
