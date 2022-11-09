<script setup>
// import {
//   KlevuFetch,
//   kmcRecommendation,
//   sendRecommendationViewEvent,
// } from "@klevu/core"
// import useSearch from "../stores/searchStore"

// const searchStore = useSearch()
// const route = useRoute()

// let eventClick

// const initialFetch = async () => {
//   searchStore.clearSearchResults()
//   await nextTick()
//   searchStore.loading = true

//   const res = await KlevuFetch(
//     kmcRecommendation(
//       'k-d27f0675-f1b3-49aa-a66b-2dab27a3f698',
//       {
//         id: "advFilteredRecs",
//         currentProductId: '32878357151849',
//         itemGroupId: '4705773027433',
//       },
//       sendRecommendationViewEvent("advanced filtered recommendations"),
//     )
//   )

//   const recs = res.queriesById("advFilteredRecs")
//   console.log(recs);
//   if (!recs) {
//     return
//   }

//   eventClick = recs?.getRecommendationClickSendEvent?.()
//   searchStore.setProducts(recs.records ?? [])
//   await nextTick()
// }

// const productClickHandler = (p) => {
//   eventClick(p.id, p.itemGroupId, p)
// }

// initialFetch()
</script>

<template>
  <div class="">
    <div
      class="hero min-h-screen"
      style="
        background-image: url(https://api.lorem.space/image/fashion?w=1000&h=800);
        background-position: top;
      "
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Klevu SDK</h1>
          <p class="mb-5">
            This website is just one of many examples using Klevu's SDK on a
            headless webserver using NuxtJS 3.
          </p>
          <a
            href="https://github.com/klevultd/frontend-sdk/"
            target="_blank"
            class="btn btn-primary"
            >Learn More</a
          >
        </div>
      </div>
    </div>
    <Product
      v-for="product in searchStore.products"
      :key="product.id"
      :product="product"
      @clickHandler="productClickHandler(product)"
      classes="p-2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-5"
    />
  </div>
</template>

<style scoped></style>
