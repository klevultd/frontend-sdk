import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { boostWithRecords } from "./boostWithRecords.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
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
