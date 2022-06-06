import { defineNuxtConfig } from "nuxt"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    // klevuApikey: "klevu-160320037354512854",
    klevuApikey: "klevu-164651914788114877",
    // klevuUrl: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    klevuUrl: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    public: {
      // klevuApikey: "klevu-160320037354512854",
      klevuApikey: "klevu-164651914788114877",
      // klevuUrl: "https://eucs23v2.ksearchnet.com/cs/v2/search",
      klevuUrl: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    },
  },

  // meta
  meta: {
    title: "Klevu + Nuxt3",
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Klevu + Nuxt3",
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

  css: ["@/styles/main.css"],

  // modules
  modules: ["@vueuse/nuxt", "@nuxtjs/tailwindcss"],
  // build modules
  buildModules: ["@pinia/nuxt"],
})
