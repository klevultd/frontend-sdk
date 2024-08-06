import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Basic search", async () => {
  const result = await KlevuFetch(
    search("hoodies", {
      id: "test",
    })
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
})

test("Limit test", async () => {
  const result = await KlevuFetch(
    search("*", {
      limit: 14,
    })
  )

  expect(result.queriesById("search")?.records.length).toBe(14)
})

test("No type errors", async () => {
  const result = await KlevuFetch(
    search("*", {
      limit: 14,
      typeOfRecords: ["test"],
    })
  )

  expect(result.queryExists("test")).toBeFalsy()
})
