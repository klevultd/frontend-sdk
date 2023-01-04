import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { debug, listFilters } from "../../modifiers/index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
})

test("Next page pagination test", async () => {
  const limit = 2

  const result = await KlevuFetch(
    search(
      "*",
      {
        limit,
      },
      listFilters()
    )
  )

  const searchResult = result.queriesById("search")

  expect(searchResult?.records.length).toBe(2)
  expect(searchResult?.next).toBeDefined()
  expect(searchResult?.filters?.length).toBeGreaterThan(0)
  expect(searchResult?.meta.offset).toBe(0 * limit)
  expect(searchResult?.meta.noOfResults).toBe(limit)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const nextResult = await searchResult?.next!()
  const nextSearchResult = nextResult?.queriesById("search")

  const prevFirstId = searchResult?.records[0].id
  const nextFirstId = nextSearchResult?.records[0].id
  expect(nextFirstId).not.toBe(prevFirstId)
  expect(nextSearchResult?.next).toBeDefined()
  expect(nextSearchResult?.filters?.length).toBeGreaterThan(0)
  expect(nextSearchResult?.meta.offset).toBe(1 * limit)
  expect(nextSearchResult?.meta.noOfResults).toBe(limit)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const nextNextResult = await nextSearchResult?.next!()
  const nextNextSearchResult = nextNextResult?.queriesById("search")
  const nextNextFirstId = nextNextSearchResult?.records[0].id
  expect(nextNextFirstId).not.toBe(prevFirstId)
  expect(nextNextFirstId).not.toBe(nextFirstId)
  expect(nextNextSearchResult?.filters?.length).toBeGreaterThan(0)
  expect(nextNextSearchResult?.meta.offset).toBe(2 * limit)
  expect(nextNextSearchResult?.meta.noOfResults).toBe(limit)
})

test("Jump to pages test", async () => {
  const limit = 2

  const result = await KlevuFetch(
    search(
      "*",
      {
        limit,
      },
      listFilters()
    )
  )

  const searchResult = result.queriesById("search")

  expect(searchResult?.records.length).toBe(2)
  expect(searchResult?.getPage).toBeDefined()
  expect(searchResult?.filters?.length).toBeGreaterThan(0)
  expect(searchResult?.meta.offset).toBe(0 * limit)
  expect(searchResult?.meta.noOfResults).toBe(limit)

  const page3Results = await searchResult?.getPage?.({ pageIndex: 2 })
  const page3SearchResult = page3Results?.queriesById("search")
  expect(page3SearchResult?.records.length).toBe(2)
  expect(page3SearchResult?.getPage).toBeDefined()
  expect(page3SearchResult?.filters?.length).toBeGreaterThan(0)
  expect(page3SearchResult?.meta.offset).toBe(2 * limit)

  const page1AgainResult = await page3SearchResult?.getPage?.({ pageIndex: 0 })
  const page1AgainSearchResult = page1AgainResult?.queriesById("search")
  expect(page1AgainSearchResult?.meta.offset).toBe(0)
  expect(searchResult?.records).toEqual(page1AgainSearchResult?.records)

  const page1AgainResult2 = await searchResult?.getPage?.({ pageIndex: 0 })
  const page1AgainSearchResult2 = page1AgainResult2?.queriesById("search")
  expect(page1AgainSearchResult2?.meta.offset).toBe(0)
  expect(searchResult?.records).toEqual(page1AgainSearchResult2?.records)
})
