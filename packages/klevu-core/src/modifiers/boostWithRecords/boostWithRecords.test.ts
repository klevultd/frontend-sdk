import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { boostWithRecords } from "./boostWithRecords.js"
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
      "hoodies",
      {
        id: "search",
      },
      boostWithRecords([
        {
          id: "12345",
          weight: 4,
        },
      ])
    )
  )

  expect(result.queriesById("search")).toBeDefined()
})
