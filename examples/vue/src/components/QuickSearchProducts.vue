<script setup>
import useSearch from '../state/searchStore'
const searchState = useSearch();

</script>

<template>
    <div class="product-results" v-if="searchState.products.length > 0">
        <h3>Products</h3>
        <div class="product-list">
            <div class="product" v-for="product in searchState.products" :key="product.id">
                <a :href="`/product/${product.id}`">
                    <div class="product-image">
                        <img :src="product.imageUrl" />
                    </div>
                    <div class="product-title text-center">{{ product.name }}</div>
                    <div
                        class="product-pric text-center"
                    >{{ new Intl.NumberFormat(undefined, { style: 'currency', currency: product.currency }).format(product.price) }}</div>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-list {
    @apply lg:flex lg:flex-wrap;
}
.product {
    @apply p-2 lg:w-1/3;
}
.product a {
    @apply flex flex-col h-full;
}
.product-image {
    @apply flex justify-center items-start;
    flex-grow: 1;
}
</style>