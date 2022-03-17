import { KlevuConfig, KlevuFetch, search, debug } from "../.."
import { KlevuSearchSorting } from "../../models"
import { include } from "../include/include"
import { top } from "./top"

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
      include([topProductId]),
      debug()
    )
  )

  console.log(JSON.stringify(result.apiResponse, undefined, 2))
  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
  expect(
    result.queriesById("test")?.records[0].id === topProductId
  ).toBeTruthy()
})
