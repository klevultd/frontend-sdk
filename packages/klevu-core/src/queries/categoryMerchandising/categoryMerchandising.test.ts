import { KlevuConfig, KlevuFetch } from "../../index.js"
import { categoryMerchandising } from "./categoryMerchandising.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Basic search", async () => {
  const result = await KlevuFetch(categoryMerchandising("Women"))

  expect(result.queriesById("categoryMerchandising")).toBeDefined()
})
