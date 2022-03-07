import { initKlevuConfig, KlevuFetch, search } from "../.."
import { boostWithKeywords } from "./boostWithKeywords"

beforeEach(() => {
  initKlevuConfig({
    url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-156925593843210765",
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
