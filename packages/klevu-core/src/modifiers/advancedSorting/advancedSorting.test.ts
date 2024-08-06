import {
  KlevuConfig,
  KlevuFetch,
  search,
  advancedSorting,
  AdvancedSortingDiretion,
} from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test.skip("Advanced sorting", async () => {
  const result = await KlevuFetch(
    search(
      "*",
      {
        id: "test",
      },
      advancedSorting([
        {
          type: "FIELD",
          key: "custom_rating_count",
          order: AdvancedSortingDiretion.Ascending,
        },
      ])
    )
  )

  expect(result.queriesById("test")).toBeDefined()
})
