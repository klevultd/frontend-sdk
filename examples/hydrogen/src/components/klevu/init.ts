import { KlevuConfig } from "@klevu/core"
import Axios from "axios"

export const credentials = {
  url: "https://eucs30v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-165829460115715456",
}

KlevuConfig.init({
  ...credentials,
  axios: Axios,
})
