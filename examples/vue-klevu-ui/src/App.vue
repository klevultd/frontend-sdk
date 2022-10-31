<script setup lang="ts">
import type { KlevuRecord } from "@klevu/core";
import {
  KlevuButton,
  KlevuInit,
  KlevuProductGrid,
  KlevuSearchField,
} from "@klevu/ui-vue";
</script>

<script lang="ts">
export default {
  // Importing components is optional
  // It gives you typings in Typescript!
  components: {
    KlevuInit,
    KlevuSearchField,
    KlevuProductGrid,
    KlevuButton,
  },
  data() {
    return {
      products: [] as KlevuRecord[],
    };
  },
  methods: {
    klevuResults(records: KlevuRecord[]) {
      this.products = records;
    },
    klevuSuggestions(event: any) {
      console.log("suggetions", event.detail);
    },
    test() {
      console.log("hello world!");
    },
    productclick(product: KlevuRecord) {
      console.log("clicked product", product.id);
      // here could be some routing logic
    },
  },
};
</script>

<template>
  <div id="container">
    <klevu-init
      url="https://eucs30v2.ksearchnet.com/cs/v2/search"
      api-key="klevu-165829460115715456"
      :settings.prop="{
        onProductClick(product: any, event: any) {
          // @ts-ignore - Typescript doesn't seem to find local method even though it exists
          productclick(product);
          return false;
        },
      }"
    >
      <klevu-search-field
        search-products
        search-suggestions
        placeholder="Test placeholder"
        fallback-term="hoodies"
        @klevuSearchResults="
          klevuResults(($event.detail.search?.records as KlevuRecord[]) ?? [])
        "
        @klevuSearchSuggestions="klevuSuggestions($event)"
      ></klevu-search-field>
      <klevu-product-grid :products="products"></klevu-product-grid>

      <h1>Just a button</h1>
      <klevu-button v-on:click="test()">Hello Button</klevu-button>
    </klevu-init>
  </div>
</template>

<style scoped>
#container {
  padding: 20px;
}
</style>
