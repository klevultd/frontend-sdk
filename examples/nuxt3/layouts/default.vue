<template>
  <Transition name="page">
    <div>
      <SlideoutCart />
      <Menu />
      <slot />
      <Footer />
    </div>
  </Transition>
</template>
