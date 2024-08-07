import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { KlevuSearchSorting } from "../../models/index.js"
import { include } from "../include/include.js"
import { top } from "./top.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Product as top result", async () => {
  const topProductId =
    "b26c6ca6-6f70-4c32-845d-5d4c334b7690-b26c6ca6-6f70-4c32-845d-5d4c334b7690-1"

  const result = await KlevuFetch(
    search(
      "hoodies",
      {
        id: "test",
        sort: KlevuSearchSorting.Relevance,
      },
      top([topProductId]),
      include([topProductId])
    )
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
  expect(
    result.queriesById("test")?.records[0].id === topProductId
  ).toBeTruthy()
})
