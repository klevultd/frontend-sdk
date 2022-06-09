<script setup>
import useSearch from "../stores/searchStore"

const searchStore = useSearch()
const props = defineProps({
  option: Object,
})
const toggleOption = (key, name) => {
  searchStore.managerOptionToggleFn(key, name)
}
</script>

<template>
  <div class="option-wrapper pb-4">
    <div class="option-label ml-6 py-2 uppercase">{{ option.label }}</div>
    <ul class="option-links">
      <li v-for="(optionLink, index) in option.options" :key="index">
        <label class="cursor-pointer ml-6 text-sm pb-2 flex">
          <input
            type="checkbox"
            :checked="optionLink.selected"
            @click="toggleOption(option.key, optionLink.name)"
            class="mr-2"
          />
          {{ optionLink.name }}
          <span class="ml-auto mr-6 inline-block"
            >({{ optionLink.count }})</span
          >
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
li {
  @apply ml-4;
}
</style>
