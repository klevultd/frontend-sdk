import React from "react"
import ReactDOM from "react-dom"
import { KlevuConfig } from "@klevu/core"
import { App } from "./app"

KlevuConfig.init({
  url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-160320037354512854",
})

ReactDOM.render(<App />, document.getElementById("reactroot"))
