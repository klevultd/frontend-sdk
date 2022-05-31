<script setup>
import useSearch from "../stores/searchStore"

const searchStore = useSearch()
const props = defineProps({
  option: Object,
  manager: Object,
})
const toggleOption = (key, name) => {
  props.manager.toggleOption(key, name)
}
</script>

<template>
  <div class="option-wrapper pb-4">
    <div class="option-label py-2 uppercase">{{ option.label }}</div>
    <ul class="option-links">
      <li v-for="(optionLink, index) in option.options" :key="index">
        <label class="cursor-pointer text-sm py-2">
          <input
            type="checkbox"
            :checked="optionLink.selected"
            @click="toggleOption(option.key, optionLink.name)"
          />
          {{ optionLink.name }} ({{ optionLink.count }})
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
