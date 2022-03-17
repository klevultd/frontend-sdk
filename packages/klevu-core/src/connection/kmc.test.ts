import { KlevuKMCSettings, KlevuConfig } from "../index"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
  })
})

test("Fetch all settings", async () => {
  const result = await KlevuKMCSettings()

  expect(result.banner).toBeDefined()
  expect(result.maps).toBeDefined()
  expect(result.root).toBeDefined()
})
