<script setup>
const props = defineProps({
    product: Object,
    classes: String,
})
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
    <div class="product" :class="[classes]">
        <router-link :to="`/product/${product.id}`">
            <div class="product-image" @mouseover="hoverOn" @mouseout="hoverOut">
                <img :src="product.imageUrl" />
            </div>
            <div class="product-title text-center">{{ product.name }}</div>
            <div
                class="product-price text-center"
            >{{ new Intl.NumberFormat(undefined, { style: 'currency', currency: product.currency }).format(product.price) }}</div>
            <div class="product-swatches"></div>
        </router-link>
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