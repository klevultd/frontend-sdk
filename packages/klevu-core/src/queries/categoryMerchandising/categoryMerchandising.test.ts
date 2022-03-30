import { KlevuConfig, KlevuFetch } from "../../index.js"
import { categoryMerchandising } from "./categoryMerchandising.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
  })
})

test("Basic search", async () => {
  const result = await KlevuFetch(categoryMerchandising("Women"))

  expect(result.queriesById("categoryMerchandising")).toBeDefined()
})
