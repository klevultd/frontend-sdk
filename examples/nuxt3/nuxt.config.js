// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // meta
  meta: {
    title: "Nuxt3 + Klevu",
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "",
      },
    ],
    link: [
      { rel: "icon", sizes: "32x32", href: "/cropped-klevu-icon-32x32.png" },
      { rel: "preload", as: "image", href: "/No-Image-Placeholder.svg" },
    ],
    bodyAttrs: {
      class: "overflow-x-hidden",
    },
  },

  // loading of global styles
  css: ["@/styles/main.css"],

  // modules used in the project
  modules: ["@vueuse/nuxt", "@nuxtjs/tailwindcss"],

  // build modules
  buildModules: ["@pinia/nuxt"],
})
