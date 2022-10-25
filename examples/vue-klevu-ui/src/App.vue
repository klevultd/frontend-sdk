<script setup lang="ts">
import {
  KlevuInit,
  KlevuSearchField,
  KlevuProductGrid,
  KlevuButton,
} from "@klevu/ui-vue";
import type { KlevuRecord } from "@klevu/core";

/*
import { ref, onMounted } from "vue";

const test = ref<any>(null);

onMounted(() => {
  console.log("hep!", test);
  test.value.$el.searchProducts = true;
  test.value.$el.searchSuggestions = true;
});
*/
</script>

<script lang="ts">
export default {
  components: {
    KlevuButton,
    KlevuInit,
    KlevuSearchField,
    KlevuProductGrid,
  },
  data() {
    return {
      products: [] as KlevuRecord[],
    };
  },
  methods: {
    klevuResults(event: any) {
      console.log("hello!");
      this.products = event.detail.search?.records ?? [];
    },
    klevuSuggestions(event: any) {
      console.log("suggetions", event);
    },
    test() {
      console.log("test!");
    },
  },
};
</script>

<template>
  <div id="container">
    <klevu-init
      url="https://eucs30v2.ksearchnet.com/cs/v2/search"
      api-key="klevu-165829460115715456"
      :settings="{
        onProductClick(product, event) {
          alert(`should redirect to product id ${product.id}`);
          return false;
        },
      }"
    >
      <klevu-search-field
        search-products
        search-suggestions
        placeholder="Test placeholder"
        fallback-term="hoodies"
        v-on:klevu-search-results="klevuResults($event)"
        v-on:klevu-search-suggestions="klevuSuggestions($event)"
      ></klevu-search-field>
      <KlevuProductGrid :products="products"></KlevuProductGrid>

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
