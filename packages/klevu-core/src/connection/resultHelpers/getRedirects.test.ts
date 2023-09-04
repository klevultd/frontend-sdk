import axios from "axios"
import {
  KlevuConfig,
  KlevuFetch,
  categoryMerchandising,
  search,
} from "../../index.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Searching test string should have redirects", async () => {
  const result = await KlevuFetch(
    search("test-do-not-remove", {
      id: "test",
    })
  )

  const test = await result.queriesById("test")

  expect(test.getRedirects).toBeDefined()

  const redirects = await test.getRedirects?.()
  expect(redirects?.length).toBe(1)

  expect(redirects?.[0].url).toContain("www.klevu.com")
})

test("Category merchandising test string should not have redirects", async () => {
  const result = await KlevuFetch(
    categoryMerchandising("women", {
      id: "test",
    })
  )

  const test = await result.queriesById("test")

  expect(test.getRedirects).not.toBeDefined()
})
