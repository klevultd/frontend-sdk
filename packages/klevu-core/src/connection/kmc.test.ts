import { KlevuKMCSettings, KlevuConfig } from "../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Fetch all settings", async () => {
  const result = await KlevuKMCSettings()

  expect(result.banner).toBeDefined()
  expect(result.maps).toBeDefined()
  expect(result.root).toBeDefined()
})
