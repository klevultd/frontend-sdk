<template>
  <div>
    <div class="text-sm breadcrumbs">
      <ul class="m-3">
        <li>
          <NuxtLink to="/"><IconsHome class="w-4 mr-2" /> Home</NuxtLink>
        </li>
        <li v-for="(crumb, index) in breadcrumbs" :key="index">
          <NuxtLink
            :to="crumb.link"
            v-if="crumb.link && crumb.link != '/search'"
            >{{ crumb.title }}</NuxtLink
          >
          <span v-else>{{ crumb.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const isSearch = computed(() => route.path == "/search")
const breadcrumbs = computed(() => {
  const crumbs = []
  let url = ""
  if (route.path.indexOf("/products/") == 0) {
    return
  }
  const splits = route.path.substring(1).split("/")
  splits.forEach((crumb, pathIndex) => {
    const splitCrumbs = crumb.split(";")
    splitCrumbs.forEach((splitCrumb, splitIndex) => {
      url += "/" + splitCrumb
      if (
        splits.length == pathIndex + 1 &&
        splitCrumbs.length == splitIndex + 1
      ) {
        url = ""
      }
      if (splitCrumb != "collections") {
        crumbs.push({ title: splitCrumb, link: url })
      }
    })
  })
  return crumbs
})
</script>
