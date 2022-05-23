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
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
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

  expect(filterManager.options.length).toBeGreaterThan(0)
})
