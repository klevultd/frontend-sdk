import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { overrideSettings } from "./overrideSettings.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Override modifier", async () => {
  const result = await KlevuFetch(
    search(
      "*",
      {
        id: "test",
        limit: 2,
      },
      overrideSettings({
        limit: 3,
      })
    )
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBe(3)
})
