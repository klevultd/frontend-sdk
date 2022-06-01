<template>
  <Transition name="page">
    <div>
      <SlideoutCart />
      <Filters />
      <QuickSearchResults />
      <Menu />
      <Breadcrumb v-if="$route.path != '/search'" />
      <SearchMeta />
      <slot />
      <Footer />
    </div>
  </Transition>
</template>
