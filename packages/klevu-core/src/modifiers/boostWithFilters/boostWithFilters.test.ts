import {
  KlevuConfig,
  KlevuFetch,
  search,
  boostWithFilters,
} from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
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
