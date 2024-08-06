import {
  fallback,
  KlevuConfig,
  KlevuFetch,
  search,
  trendingProducts,
} from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Fallback query", async () => {
  const result = await KlevuFetch(
    search(
      "asdfgsdjug8isujgosidgjidsogjsdiogjsdiog",
      {
        id: "wrong-search",
      },
      fallback(trendingProducts(), {
        runWhenLessThanResults: 300,
      })
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
      "shirts",
      {
        id: "no-fallback",
      },
      fallback(trendingProducts(), {
        runWhenLessThanResults: 2,
      })
    )
  )

  expect(result.queriesById("no-fallback")?.records.length).toBeGreaterThan(0)
  expect(result.queryExists("no-fallback-fallback")).toBeFalsy()
})
