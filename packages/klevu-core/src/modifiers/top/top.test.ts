import { KlevuConfig, KlevuFetch, search, debug } from "../../index.js"
import { KlevuSearchSorting } from "../../models/index.js"
import { include } from "../include/include.js"
import { top } from "./top.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
  })
})

test("Product as top result", async () => {
  const topProductId = "36801812660378"

  const result = await KlevuFetch(
    search(
      "hoodies",
      {
        id: "test",
        sort: KlevuSearchSorting.Relevance,
      },
      top([topProductId]),
      include([topProductId])
    )
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
  expect(
    result.queriesById("test")?.records[0].id === topProductId
  ).toBeTruthy()
})
