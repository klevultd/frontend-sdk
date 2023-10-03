/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  applyFilters,
  categoryMerchandising,
  KlevuConfig,
  KlevuFetch,
  KlevuLastClickedProducts,
  kmcRecommendation,
  listFilters,
  search,
} from "../../index.js"
import axios from "axios"
import { jest } from "@jest/globals"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
})

test("Search click event should be defined", async () => {
  const result = await KlevuFetch(
    search("hoodies", {
      id: "test",
    })
  )

  const query = result.queriesById("test")

  expect(query).toBeDefined()
  expect(query?.searchClickEvent).toBeDefined()
  expect(query?.categoryMerchandisingClickEvent).toBeUndefined()
  expect(query?.recommendationClickEvent).toBeUndefined()

  const product = query!.records[0]

  query?.searchClickEvent?.({
    productId: product.id,
    variantId: product.itemGroupId,
  })

  expect(KlevuLastClickedProducts.getLastClickedLatestsFirst()[0]).toBe(
    product.id
  )
})

test("Search click should send a search event on first time, but not on second time", async () => {
  const result = await KlevuFetch(
    search("hoodies", {
      id: "test",
    })
  )

  const query = result.queriesById("test")

  const getSpySuccess = jest.spyOn(KlevuConfig.default!.axios!, "post")

  query?.searchClickEvent?.({
    productId: query.records[0].id,
    variantId: query.records[0].itemGroupId,
  })

  expect(getSpySuccess).toHaveBeenCalledWith(
    expect.stringContaining("analytics/n-search"),
    expect.anything(),
    expect.anything()
  )
  expect(getSpySuccess).toHaveBeenCalledWith(
    expect.stringContaining("productTracking"),
    expect.anything(),
    expect.anything()
  )
  expect(getSpySuccess).toHaveBeenCalledTimes(2)

  query?.searchClickEvent?.({
    productId: query.records[0].id,
    variantId: query.records[0].itemGroupId,
  })

  expect(getSpySuccess).toHaveBeenCalledTimes(3)
  expect(getSpySuccess).toHaveBeenCalledWith(
    expect.stringContaining("productTracking"),
    expect.anything(),
    expect.anything()
  )
})

test("Category merchandising click event", async () => {
  const result = await KlevuFetch(categoryMerchandising("Women"))

  const query = result.queriesById("categoryMerchandising")

  expect(query).toBeDefined()
  expect(query?.categoryMerchandisingClickEvent).toBeDefined()
  expect(query?.searchClickEvent).toBeUndefined()
  expect(query?.recommendationClickEvent).toBeUndefined()

  const product = query!.records[0]

  query?.categoryMerchandisingClickEvent?.({
    categoryTitle: "Women",
    productId: product.id,
    variantId: product.itemGroupId,
  })

  expect(KlevuLastClickedProducts.getLastClickedLatestsFirst()[0]).toBe(
    product.id
  )
})

/**
 * @todo: Find new way of testing this as recommendation can be deleted in backend and then it doesn't work anymore
 */
test.skip("Recommendation click event", async () => {
  // special case for recommendation
  KlevuConfig.init({
    url: "", // this should work without url
    apiKey: "klevu-158755634955912036",
    axios,
  })

  const result = await KlevuFetch(
    kmcRecommendation("3a5580bf-c5b2-407e-acac-4a58ae730b64", {
      id: "test",
    })
  )

  const query = result.queriesById("test")

  expect(query).toBeDefined()
  expect(query?.categoryMerchandisingClickEvent).toBeUndefined()
  expect(query?.searchClickEvent).toBeUndefined()
  expect(query?.recommendationClickEvent).toBeDefined()

  const product = query!.records[0]

  query?.recommendationClickEvent?.({
    productId: product.id,
    variantId: product.itemGroupId,
  })

  expect(KlevuLastClickedProducts.getLastClickedLatestsFirst()[0]).toBe(
    product.id
  )
})

test("Override user IP for request", async () => {
  const result = await KlevuFetch(categoryMerchandising("Women"))

  const query = result.queriesById("categoryMerchandising")

  expect(query).toBeDefined()
  expect(query?.categoryMerchandisingClickEvent).toBeDefined()
  expect(query?.searchClickEvent).toBeUndefined()
  expect(query?.recommendationClickEvent).toBeUndefined()

  const product = query!.records[0]

  const getSpySuccess = jest.spyOn(KlevuConfig.default!.axios!, "post")

  query?.categoryMerchandisingClickEvent?.({
    productId: product.id,
    categoryTitle: "Women",
    variantId: product.itemGroupId,
    override: {
      klevu_shopperIP: "192.168.0.1",
    },
  })

  expect(getSpySuccess).toHaveBeenCalledTimes(1)
  expect(
    (getSpySuccess.mock.calls[0][1] as any).get("klevu_shopperIP")
  ).toEqual("192.168.0.1")

  expect(KlevuLastClickedProducts.getLastClickedLatestsFirst()[0]).toBe(
    product.id
  )
})

test("Merchandising call has correct filters set", async () => {
  const result = await KlevuFetch(
    categoryMerchandising(
      "Women",
      {},
      listFilters(),
      applyFilters([
        {
          key: "color",
          values: ["Agate", "Amber"],
        },
      ])
    )
  )

  const query = result.queriesById("categoryMerchandising")
  expect(query?.categoryMerchandisingClickEvent).toBeDefined()

  const getSpySuccess = jest.spyOn(KlevuConfig.default!.axios!, "post")

  const product = query!.records[0]
  query?.categoryMerchandisingClickEvent?.({
    productId: product.id,
    categoryTitle: "Women",
    variantId: product.itemGroupId,
    override: {
      klevu_shopperIP: "192.168.0.1",
    },
  })

  expect(getSpySuccess).toHaveBeenCalledTimes(1)
  expect(
    (getSpySuccess.mock.calls[0][1] as any).get("klevu_activeFilters")
  ).toEqual("color:Agate;;color:Amber")
})

test("Filters should not be set if there are no filters", async () => {
  const result = await KlevuFetch(categoryMerchandising("Women"))

  const query = result.queriesById("categoryMerchandising")
  expect(query?.categoryMerchandisingClickEvent).toBeDefined()

  const getSpySuccess = jest.spyOn(KlevuConfig.default!.axios!, "post")
  const product = query!.records[0]
  query?.categoryMerchandisingClickEvent?.({
    productId: product.id,
    categoryTitle: "Women",
    variantId: product.itemGroupId,
    override: {
      klevu_shopperIP: "192.168.0.1",
    },
  })

  expect(getSpySuccess).toHaveBeenCalledTimes(1)
  expect(getSpySuccess).toHaveBeenCalledWith(
    expect.anything(),
    expect.not.objectContaining({
      klevu_activeFilters: expect.anything(),
    }),
    expect.anything()
  )
})

test("Hooks should be called", (done) => {
  KlevuFetch(
    search("hoodies", {
      id: "test",
    })
  ).then((result) => {
    const query = result.queriesById("test")

    query?.hooks.push(async (params) => {
      try {
        expect(params.type).toBe("search")
        done()
      } catch (e) {
        done(e)
      }
    })

    query?.searchClickEvent?.({
      productId: query.records[0].id,
      variantId: query.records[0].itemGroupId,
    })
  })
})
