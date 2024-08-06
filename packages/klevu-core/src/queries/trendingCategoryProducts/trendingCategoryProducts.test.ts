import {
  KlevuConfig,
  KlevuFetch,
  search,
  KlevuLastClickedProducts,
  trendingCategoryProducts,
} from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Trending category products recommendation", async () => {
  // fetch some data to and click first item
  const result = await KlevuFetch(
    search("hoodies", {
      id: "test",
    })
  )

  const query = result.queriesById("test")

  expect(query).toBeDefined()
  expect(query?.searchClickEvent).toBeDefined()

  const product = query!.records[0]

  query?.searchClickEvent?.({
    productId: product.id,
    variantId: product.variantId,
  })

  expect(KlevuLastClickedProducts.getLastClickedLatestsFirst()[0]).toBe(
    product.id
  )

  const klevuFetchFunctions = [
    trendingCategoryProducts("Women", {
      useLastVisitedProducts: true,
    }),
  ]

  expect(
    klevuFetchFunctions[0].queries?.[0].settings?.context?.recentObjects?.some(
      (o) => o.records.some((r) => r.id === product.id)
    )
  ).toBeTruthy()

  const trendingCategoryProductsResult = await KlevuFetch(
    ...klevuFetchFunctions
  )

  const trendingQuery = trendingCategoryProductsResult.queriesById(
    "trendingCategoryProducts"
  )

  expect(trendingQuery).toBeDefined()
})
