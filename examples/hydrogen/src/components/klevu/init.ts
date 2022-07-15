import { KlevuConfig } from "@klevu/core"
import Axios from "axios"

KlevuConfig.init({
  url: "https://box-qa.klevu.com/cs/v2/search",
  apiKey: "klevu-16521954575361126",
  axios: Axios,
})
