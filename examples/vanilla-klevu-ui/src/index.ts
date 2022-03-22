import { KlevuConfig } from "@klevu/core"
import { QuickSearch } from "@klevu/ui"

KlevuConfig.init({
  url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-160320037354512854",
})

new QuickSearch()
