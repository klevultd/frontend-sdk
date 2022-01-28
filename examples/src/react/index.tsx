import React from "react"
import ReactDOM from "react-dom"
import { KlevuConfig } from "@klevu/core"
import { App } from "./app"

KlevuConfig.init({
  url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-156925593843210765",
})

ReactDOM.render(<App />, document.getElementById("reactroot"))
