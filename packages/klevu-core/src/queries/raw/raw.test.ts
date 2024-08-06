import { KlevuConfig, KlevuFetch, raw } from "../../index.js"
import { KlevuTypeOfRequest } from "../../models/KlevuTypeOfRequest.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("raw search", async () => {
  const result = await KlevuFetch(
    raw({
      id: "test",
      typeOfRequest: KlevuTypeOfRequest.Search,
      settings: {
        query: {
          term: "hoodies",
        },
      },
    })
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
})
