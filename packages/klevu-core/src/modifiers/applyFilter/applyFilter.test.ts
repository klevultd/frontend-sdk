import { KlevuConfig, KlevuFetch, search, applyFilters } from "../../index.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
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
          key: "type",
          values: ["Badge"],
        },
      ])
    )
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBe(1)
  expect(result.queriesById("test")?.records[0].id === "36800417988762")
})
