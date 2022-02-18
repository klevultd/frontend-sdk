import { KlevuConfig, KlevuFetch, search } from "../.."

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-156925593843210765",
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
    search("hoodies", {
      limit: 2,
    })
  )

  expect(result.queriesById("search")?.records.length).toBe(2)
  expect(result.next).toBeDefined()

  const nextResult = await result.next!()
  const prevFirstId = result.queriesById("search")?.records[0].id
  const nextFirstId = nextResult.queriesById("search")?.records[0].id
  expect(nextFirstId).not.toBe(prevFirstId)
  expect(nextResult.next).toBeDefined()

  const nextNextResult = await nextResult.next!()
  const nextNextFirstId = nextNextResult.queriesById("search")?.records[0].id
  expect(nextNextFirstId).not.toBe(prevFirstId)
  expect(nextNextFirstId).not.toBe(nextFirstId)
})
