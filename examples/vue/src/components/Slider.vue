<script setup>
//import { ref } from 'vue'
import MultiRangeSlider from "multi-range-slider-vue";
import "../../node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css";
import "../../node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";
import useSearch from '../state/searchStore'
import {
    KlevuDomEvents,
} from "@klevu/core";
import debounce from "lodash.debounce"

const searchStore = useSearch();
const props = defineProps({
    slider: Object,
    manager: Object,
})
const realMax = 1 * props.slider.max;
let minValue = 1 * props.slider.min;
let maxValue = 1 * props.slider.max;

const updateSliderValues = e => {
    minValue = e.minValue
    maxValue = e.maxValue

    props.manager.updateSlide(props.slider.key, minValue, maxValue)
}
const debouncedUpdateSliderHandler = debounce(updateSliderValues, 300)

</script>

<template>
    <div class="slider-wrapper pb-4">
        <div
            class="slider-label py-2 uppercase"
        >{{ slider.label === 'klevu_price' ? 'Price' : slider.label }}</div>
        <div class="slider-wrapper">
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

<style scoped>
</style>