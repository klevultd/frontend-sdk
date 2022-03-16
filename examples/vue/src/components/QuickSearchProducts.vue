<script setup>
import useQuickSearch from '../state/quickSearchStore'
import Product from './Product.vue'
const quickSearchStore = useQuickSearch();

</script>

<template>
    <div class="product-results mb-5" v-if="quickSearchStore.products.length > 0">
        <h3>Products</h3>
        <div class="product-list">
            <Product
                v-for="product in quickSearchStore.products"
                :key="product.id"
                :product="product"
                classes="p-2 lg:w-1/3"
            />
        </div>
    </div>
</template>

 


<style scoped>
.product-list {
    @apply md:flex md:flex-wrap;
}
</style>