import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { exclude } from "./exclude.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Include modifier", async () => {
  const excludeItemGroupId = "5860347478170"

  const result = await KlevuFetch(
    search(
      "hoodies",
      {
        id: "test",
      },
      exclude([excludeItemGroupId])
    )
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
  expect(
    result
      .queriesById("test")
      ?.records.some((r) => r.itemGroupId === excludeItemGroupId)
  ).toBeFalsy()
})
