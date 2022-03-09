import {
  fallback,
  KlevuConfig,
  KlevuFetch,
  search,
  trendingProducts,
} from "../.."

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-156925593843210765",
  })
})

test("Fallback query", async () => {
  const result = await KlevuFetch(
    search(
      "asdfgsdjug8isujgosidgjidsogjsdiogjsdiog",
      {
        id: "wrong-search",
        fallbackWhenCountLessThan: 300,
      },
      fallback(trendingProducts())
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
      fallback(trendingProducts())
    )
  )

  expect(result.queriesById("no-fallback")?.records.length).toBeGreaterThan(0)
  expect(result.queriesById("no-fallback-fallback")).not.toBeDefined()
})
