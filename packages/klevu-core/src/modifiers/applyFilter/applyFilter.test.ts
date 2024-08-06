import { KlevuConfig, KlevuFetch, search, applyFilters } from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Apply filters", async () => {
  const result = await KlevuFetch(
    search(
      "*",
      {
        id: "test",
      },
      applyFilters([
        {
          key: "size",
          values: ["34"],
        },
      ])
    )
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
})
