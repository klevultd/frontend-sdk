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
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
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
