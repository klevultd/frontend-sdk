import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { include } from "./include.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
  })
})

test("Include modifier", async () => {
  const includeProductId = "36800563314842"

  const result = await KlevuFetch(
    search(
      "hoodies",
      {
        id: "test",
      },
      include([includeProductId])
    )
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
  expect(
    result.queriesById("test")?.records.some((r) => r.id === includeProductId)
  ).toBeTruthy()
})
