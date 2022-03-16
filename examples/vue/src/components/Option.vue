<script setup>
import useSearch from '../state/searchStore'

const searchStore = useSearch();
const props = defineProps({
    option: Object,
    manager: Object,
})
</script>

<template>
    <div class="option-wrapper pb-4">
        <div class="option-label py-2 uppercase">{{ option.label }}</div>
        <ul class="option-links">
            <li v-for="(optionLink, index) in option.options" :key="index">
                <label
                    class="cursor-pointer text-sm py-2"
                    @click="manager.toggleOption(option.key, optionLink.name)"
                >
                    <input type="checkbox" :checked="optionLink.selected" />
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