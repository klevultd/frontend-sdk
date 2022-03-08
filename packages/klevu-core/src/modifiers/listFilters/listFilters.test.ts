import {
  FilterManager,
  KlevuConfig,
  KlevuFetch,
  listFilters,
  search,
} from "../.."

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-156925593843210765",
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
  const result = await KlevuFetch(
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
