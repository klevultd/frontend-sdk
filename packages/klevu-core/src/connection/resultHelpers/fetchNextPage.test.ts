/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  categoryMerchandising,
  KlevuConfig,
  KlevuFetch,
  search,
} from "../../index.js"
import { listFilters } from "../../modifiers/index.js"
import axios from "axios"
import { jest } from "@jest/globals"

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
  expect(searchResult?.getPage).toBeDefined()
  expect(searchResult?.filters?.length).toBeGreaterThan(0)
  expect(searchResult?.meta.offset).toBe(0 * limit)
  expect(searchResult?.meta.noOfResults).toBe(limit)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const nextResult = await searchResult?.getPage()
  const nextSearchResult = nextResult?.queriesById("search")

  const prevFirstId = searchResult?.records[0].id
  const nextFirstId = nextSearchResult?.records[0].id
  expect(nextFirstId).not.toBe(prevFirstId)
  expect(nextSearchResult?.getPage).toBeDefined()
  expect(nextSearchResult?.filters?.length).toBeGreaterThan(0)
  expect(nextSearchResult?.meta.offset).toBe(1 * limit)
  expect(nextSearchResult?.meta.noOfResults).toBe(limit)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const nextNextResult = await nextSearchResult?.getPage()
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

test("Next page analytics test", async () => {
  const result = await KlevuFetch(categoryMerchandising("Women"))

  const query = result.queriesById("categoryMerchandising")

  expect(query).toBeDefined()
  expect(query?.getCategoryMerchandisingClickSendEvent).toBeDefined()
  const product = query!.records[0]

  const getSpySuccess = jest
    .spyOn(KlevuConfig.default!.axios!, "get")
    .mockImplementation(() => {
      return new Promise((resolve, reject) => {
        return resolve({
          data: {},
        })
      })
    })

  query?.getCategoryMerchandisingClickSendEvent?.({
    productId: product.id,
    categoryTitle: "Women",
    variantId: product.itemGroupId,
    override: {
      klevu_shopperIP: "192.168.0.1",
    },
  })

  expect(getSpySuccess).toHaveBeenCalledTimes(1)
  expect(getSpySuccess).toHaveBeenCalledWith(
    expect.stringContaining("klevu_shopperIP=192.168.0.1")
  )

  // when doing it again, it should call the api again even though we have loaded results
  const resultPage2 = await query!.getPage?.({
    pageIndex: 1,
  })
  const query2 = resultPage2?.queriesById("categoryMerchandising")
  query2?.getCategoryMerchandisingClickSendEvent?.({
    productId: product.id,
    categoryTitle: "Women",
    variantId: product.itemGroupId,
    override: {
      klevu_shopperIP: "192.168.0.1",
    },
  })

  expect(getSpySuccess).toHaveBeenCalledTimes(2)
  expect(getSpySuccess).toHaveBeenCalledWith(
    expect.stringContaining("klevu_shopperIP=192.168.0.1")
  )

  // What if we do it third time?
  const resultPage3 = await query2!.getPage?.({
    pageIndex: 2,
  })
  const query3 = resultPage3?.queriesById("categoryMerchandising")
  query3?.getCategoryMerchandisingClickSendEvent?.({
    productId: product.id,
    categoryTitle: "Women",
    variantId: product.itemGroupId,
    override: {
      klevu_shopperIP: "192.168.0.1",
    },
  })

  expect(getSpySuccess).toHaveBeenCalledTimes(3)
  expect(getSpySuccess).toHaveBeenCalledWith(
    expect.stringContaining("klevu_shopperIP=192.168.0.1")
  )

  // Redo second analytics
  query2?.getCategoryMerchandisingClickSendEvent?.({
    productId: product.id,
    categoryTitle: "Women",
    variantId: product.itemGroupId,
    override: {
      klevu_shopperIP: "192.168.0.1",
    },
  })

  // Redo first analytics send
  query?.getCategoryMerchandisingClickSendEvent?.({
    productId: product.id,
    categoryTitle: "Women",
    variantId: product.itemGroupId,
    override: {
      klevu_shopperIP: "192.168.0.1",
    },
  })

  expect(getSpySuccess).toHaveBeenCalledTimes(5)
})
