<template>
  <Transition name="page">
    <div>
      <SlideoutCart />
      <QuickSearchResults />
      <Menu />
      <slot />
      <Footer />
    </div>
  </Transition>
</template>
