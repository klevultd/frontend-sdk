import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { boostWithKeywords } from "./boostWithKeywords.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Boost with keywords", async () => {
  const result = await KlevuFetch(
    search(
      "hoodies",
      {
        id: "search",
      },
      boostWithKeywords([
        {
          phrase: "black",
          weight: 4,
        },
      ])
    )
  )

  expect(result.queriesById("search")).toBeDefined()
})
