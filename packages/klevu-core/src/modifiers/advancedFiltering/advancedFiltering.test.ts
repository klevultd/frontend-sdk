import {
  KlevuConfig,
  KlevuFetch,
  search,
  advancedFiltering,
  FilterManager,
} from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Advanced filtering", async () => {
  const result = await KlevuFetch(
    search(
      "*",
      {
        id: "test",
      },
      advancedFiltering([
        {
          key: "size",
          singleSelect: false,
          valueOperator: "INCLUDE",
          values: ["34"],
        },
        {
          key: "klevu_price",
          singleSelect: true,
          valueOperator: "INCLUDE",
          values: ["0 - 300"],
        },
      ])
    )
  )

  const resultObject = result.queriesById("test")
  expect(resultObject).toBeDefined()
  expect(resultObject?.records.some((r) => r.size === "34")).toBeTruthy()
  expect(
    resultObject?.records.some((r) => parseFloat(r.price) > 200)
  ).toBeTruthy()
})
