import { KlevuConfig, KlevuFetch, raw } from "../../index.js"
import { KlevuTypeOfRequest } from "../../models/KlevuTypeOfRequest.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
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
