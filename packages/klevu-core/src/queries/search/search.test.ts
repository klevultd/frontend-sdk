import { KlevuConfig, KlevuFetch, search } from "../../index.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
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

test("Pagination test", async () => {
  const result = await KlevuFetch(
    search("*", {
      limit: 2,
    })
  )

  expect(result.queriesById("search")?.records.length).toBe(2)
  expect(result.next).toBeDefined()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const nextResult = await result.next!()
  const prevFirstId = result.queriesById("search")?.records[0].id
  const nextFirstId = nextResult.queriesById("search")?.records[0].id
  expect(nextFirstId).not.toBe(prevFirstId)
  expect(nextResult.next).toBeDefined()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const nextNextResult = await nextResult.next!()
  const nextNextFirstId = nextNextResult.queriesById("search")?.records[0].id
  expect(nextNextFirstId).not.toBe(prevFirstId)
  expect(nextNextFirstId).not.toBe(nextFirstId)
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
