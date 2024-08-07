import { KlevuConfig, KlevuFetch, klaviyo, search } from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

// fails in CI - disable for now and enable when CI is fixed
test.skip("Kleviyo modifier should work", async () => {
  const result = await KlevuFetch(
    search(
      "hoodies",
      {
        id: "test",
      },
      klaviyo()
    )
  )

  const query = result.queriesById("test")
  expect(query).toBeDefined()
  expect(query.searchClickEvent).toBeDefined()
  query?.searchClickEvent?.({
    productId: query.records[0].id,
  })

  // wait for a second for annotations to be fetched
  await new Promise((resolve) => setTimeout(resolve, 1000))

  expect(globalThis._learnq).toBeDefined()
  const firstItem = globalThis._learnq[0]
  expect(firstItem[2]).toMatchObject({
    "Search Term": query?.meta.searchedTerm,
  })
})
