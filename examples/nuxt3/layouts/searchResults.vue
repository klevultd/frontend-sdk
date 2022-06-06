<template>
  <Transition name="page">
    <div>
      <SlideoutCart />
      <SlideoutFilters />
      <QuickSearchResults />
      <Menu />
      <Breadcrumb v-if="$route.path != '/search'" />
      <SearchMeta />
      <slot />
      <Footer />
    </div>
  </Transition>
</template>
