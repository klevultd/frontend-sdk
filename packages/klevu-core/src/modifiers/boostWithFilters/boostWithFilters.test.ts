import {
  KlevuConfig,
  KlevuFetch,
  search,
  boostWithFilters,
} from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Boost filters", async () => {
  const result = await KlevuFetch(
    search(
      "*",
      {
        id: "test",
      },
      boostWithFilters([
        {
          key: "type",
          values: ["Badge"],
          weight: 100,
        },
      ])
    )
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records[0].id === "36800417988762")
})
