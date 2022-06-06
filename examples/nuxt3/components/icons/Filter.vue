<template>
  <svg
    :width="cWidth"
    :height="cHeight"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    class="icon inline-block"
  >
    <path
      fill-rule="evenodd"
      fill="currentColor"
      d="M880.1 154H143.9c-24.5 0-39.8 26.7-27.5 48L349 597.4V838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V597.4L907.7 202c12.2-21.3-3.1-48-27.6-48zM603.4 798H420.6V642h182.9v156zm9.6-236.6l-9.5 16.6h-183l-9.5-16.6L212.7 226h598.6L613 561.4z"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  width: String,
  height: String,
})
const size = {
  width: 20,
  height: 20,
}

const cWidth = computed(() => {
  if (!props.width && props.height) {
    return props.height
  } else if (props.width) {
    return props.width
  } else {
    return size.width
  }
})
const cHeight = computed(() => {
  if (props.width && !props.height) {
    return props.width
  } else if (props.height) {
    return props.height
  } else {
    return size.height
  }
})
</script>
