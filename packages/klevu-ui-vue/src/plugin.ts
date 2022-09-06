import { Plugin } from "vue"
import { applyPolyfills, defineCustomElements } from "@klevu/ui/loader"

export const ComponentLibrary: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements()
    })
  },
}
