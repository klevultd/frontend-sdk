<template>
  <Transition name="page">
    <div>
      <SlideoutCart />
      <Filters />
      <Menu />
      <Breadcrumb v-if="$route.path != '/search'" />
      <SearchMeta />
      <slot />
      <Footer />
    </div>
  </Transition>
</template>
