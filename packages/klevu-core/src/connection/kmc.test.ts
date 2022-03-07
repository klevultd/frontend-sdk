import { KlevuKMCSettings, initKlevuConfig } from "../index"

beforeEach(() => {
  initKlevuConfig({
    url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-156925593843210765",
  })
})

test("Fetch all settings", async () => {
  const result = await KlevuKMCSettings()

  expect(result.banner).toBeDefined()
  expect(result.maps).toBeDefined()
  expect(result.root).toBeDefined()
})
