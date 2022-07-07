import "../src/klevuStyle.css"
import { KlevuConfig } from "@klevu/core"

KlevuConfig.init({
  url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-164651914788114877",
})

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
