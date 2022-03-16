<script setup>
import useSearch from '../state/searchStore'
import Product from './Product.vue'
const searchStore = useSearch();

</script>

<template>
    <div class="product-results mb-5" v-if="searchStore.trendingProducts.length > 0">
        <h3>Trending Products</h3>
        <div class="product-list">
            <Product
                v-for="product in searchStore.products"
                :key="product.id"
                :product="product"
                classes="p-2 lg:w-1/3"
            />
        </div>
    </div>
</template>

<style scoped>
.product-list {
    @apply lg:flex lg:flex-wrap;
}
</style>