import {
  FilterManager,
  KlevuConfig,
  KlevuFetch,
  listFilters,
  search,
} from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("List filters", async () => {
  const result = await KlevuFetch(
    search(
      "hoodies",
      {
        id: "test",
      },
      listFilters()
    )
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
  expect(result.queriesById("test")?.filters).toBeDefined()
  expect(result.queriesById("test")?.filters?.length).toBeGreaterThan(0)
})

test("Filter manager - populates results", async () => {
  const filterManager = new FilterManager()
  await KlevuFetch(
    search(
      "hoodies",
      {
        id: "test",
      },
      listFilters({
        filterManager,
      })
    )
  )

  expect(filterManager.filters.length).toBeGreaterThan(0)
})
