import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { include } from "./include.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Include modifier", async () => {
  const includeProductId =
    "b26c6ca6-6f70-4c32-845d-5d4c334b7690-b26c6ca6-6f70-4c32-845d-5d4c334b7690-1"

  const result = await KlevuFetch(
    search(
      "hoodies",
      {
        id: "test",
      },
      include([includeProductId])
    )
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
  expect(
    result.queriesById("test")?.records.some((r) => r.id === includeProductId)
  ).toBeTruthy()
})
