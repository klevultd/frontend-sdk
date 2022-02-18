import {
  KlevuConfig,
  KlevuFetch,
  search,
  suggestions,
  trendingSearchProducts,
  fallback,
} from ".."

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

test("Pagination test", async () => {
  const result = await KlevuFetch(
    search("hoodies", {
      limit: 2,
    })
  )

  expect(result.queriesById("search")?.records.length).toBe(2)
  expect(result.next).toBeDefined()

  const nextResult = await result.next!()
  const prevFirstId = result.queriesById("search")?.records[0].id
  const nextFirstId = nextResult.queriesById("search")?.records[0].id
  expect(nextFirstId).not.toBe(prevFirstId)
  expect(nextResult.next).toBeDefined()

  const nextNextResult = await nextResult.next!()
  const nextNextFirstId = nextNextResult.queriesById("search")?.records[0].id
  expect(nextNextFirstId).not.toBe(prevFirstId)
  expect(nextNextFirstId).not.toBe(nextFirstId)
})

test("Fallback query", async () => {
  const result = await KlevuFetch(
    search(
      "asdfgsdjug8isujgosidgjidsogjsdiogjsdiog",
      {
        id: "wrong-search",
        fallbackWhenCountLessThan: 300,
      },
      fallback(trendingSearchProducts())
    )
  )

  expect(result.queriesById("wrong-search")?.records.length).toBe(0)
  expect(result.queriesById("wrong-search-fallback")).toBeDefined()
  expect(
    result.queriesById("wrong-search-fallback")?.records.length
  ).toBeGreaterThan(0)
})

test("No fallback when enough results", async () => {
  const result = await KlevuFetch(
    search(
      "hoodies",
      {
        id: "no-fallback",
        fallbackWhenCountLessThan: 2,
      },
      fallback(trendingSearchProducts())
    )
  )

  expect(result.queriesById("no-fallback")?.records.length).toBeGreaterThan(0)
  expect(result.queriesById("no-fallback-fallback")).not.toBeDefined()
})
