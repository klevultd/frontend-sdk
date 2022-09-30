import {
  KlevuConfig,
  KlevuFetch,
  search,
  boostWithFilters,
  KlevuLastClickedProducts,
  recentlyViewed,
} from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
})

test("Fetch recently visited", async () => {
  // fetch some data to and click first item
  const result = await KlevuFetch(
    search("hoodies", {
      id: "test",
    })
  )

  const query = result.queriesById("test")

  expect(query).toBeDefined()
  expect(query?.getSearchClickSendEvent).toBeDefined()

  const product = query!.records[0]

  query?.getSearchClickSendEvent?.()(product.id, product.itemGroupId)

  expect(KlevuLastClickedProducts.getLastClickedLatestsFirst()[0]).toBe(
    product.id
  )

  const recentlyResult = await KlevuFetch(
    recentlyViewed({
      id: "test",
    })
  )

  expect(
    recentlyResult.queriesById("test")?.records.some((p) => p.id === product.id)
  ).toBeTruthy()
})
