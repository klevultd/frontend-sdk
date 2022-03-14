import { KlevuConfig } from "@klevu/core"
import { hydrate } from "react-dom"
import { RemixBrowser } from "remix"

KlevuConfig.init({
  url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-160320037354512854",
})

hydrate(<RemixBrowser />, document)
