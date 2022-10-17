import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
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

  expect(result.queriesById("test")).toBe(undefined)
})
