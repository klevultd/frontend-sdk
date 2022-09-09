import { defineConfig } from "vite"

export default defineConfig({
  optimizeDeps: {
    include: ["@klevu/ui"],
  },
  build: {
    commonjsOptions: {
      include: [/@klevu/],
    },
  },
})
