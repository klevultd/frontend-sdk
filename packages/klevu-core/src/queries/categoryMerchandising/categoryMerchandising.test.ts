import { KlevuConfig, KlevuFetch } from "../.."
import { categoryMerchandising } from "./categoryMerchandising"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-156925593843210765",
  })
})

test("Basic search", async () => {
  const result = await KlevuFetch(categoryMerchandising("Women"))

  expect(result.queriesById("categoryMerchandising")).toBeDefined()
})
