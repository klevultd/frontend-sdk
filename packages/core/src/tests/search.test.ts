import { KlevuConfig, KlevuFetch, search, suggestions } from ".."

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-156925593843210765",
  })
})

test("Basic search", async () => {
  const result = await KlevuFetch(
    search("hoodies", {
      id: "test",
    })
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
})

test("Suggestion test", async () => {
  const result = await KlevuFetch(search("hoo"), suggestions("hoo"))

  expect(result.queriesById("search")).toBeDefined()
  expect(result.suggestionsById("suggestions")?.suggestions).toBeDefined()
  expect(
    result.suggestionsById("suggestions")?.suggestions.length
  ).toBeGreaterThan(0)
})
