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
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
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
          key: "color",
          singleSelect: false,
          valueOperator: "INCLUDE",
          values: ["Red"],
        },
        {
          key: "klevu_price",
          singleSelect: true,
          valueOperator: "INCLUDE",
          values: ["0 - 200"],
        },
      ])
    )
  )

  const resultObject = result.queriesById("test")
  expect(resultObject).toBeDefined()

  expect(resultObject?.records.some((r) => r.color === "Red")).toBeTruthy()
  expect(
    resultObject?.records.some((r) => parseFloat(r.price) > 200)
  ).toBeFalsy()
})
