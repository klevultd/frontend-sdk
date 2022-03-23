import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { boostWithKeywords } from "./boostWithKeywords.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
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
