import { Plugin } from "vue"
import { applyPolyfills, defineCustomElements } from "@klevu/ui/loader"

export const KlevuComponents: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements()
    })
  },
}
