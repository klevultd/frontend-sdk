import {
  categoryMerchandising,
  KlevuConfig,
  KlevuFetch,
  KlevuLastClickedProducts,
  kmcRecommendation,
  search,
} from "../index.js"
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
  expect(query?.getSearchClickSendEvent).toBeDefined()
  expect(query?.getCategoryMerchandisingClickSendEvent).toBeUndefined()
  expect(query?.getRecommendationClickSendEvent).toBeUndefined()

  const product = query!.records[0]

  query?.getSearchClickSendEvent?.()(product.id, product.itemGroupId)

  expect(KlevuLastClickedProducts.getLastClickedLatestsFirst()[0]).toBe(
    product.id
  )
})

test("Category merchandising click event", async () => {
  const result = await KlevuFetch(categoryMerchandising("Women"))

  const query = result.queriesById("categoryMerchandising")

  expect(query).toBeDefined()
  expect(query?.getCategoryMerchandisingClickSendEvent).toBeDefined()
  expect(query?.getSearchClickSendEvent).toBeUndefined()
  expect(query?.getRecommendationClickSendEvent).toBeUndefined()

  const product = query!.records[0]

  query?.getCategoryMerchandisingClickSendEvent?.()(
    product.id,
    "Women",
    product.itemGroupId
  )

  expect(KlevuLastClickedProducts.getLastClickedLatestsFirst()[0]).toBe(
    product.id
  )
})

test("Recommendation click event", async () => {
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
  expect(query?.getCategoryMerchandisingClickSendEvent).toBeUndefined()
  expect(query?.getSearchClickSendEvent).toBeUndefined()
  expect(query?.getRecommendationClickSendEvent).toBeDefined()

  const product = query!.records[0]

  query?.getRecommendationClickSendEvent?.()(product.id, product.itemGroupId)

  expect(KlevuLastClickedProducts.getLastClickedLatestsFirst()[0]).toBe(
    product.id
  )
})

test("Override user IP for request", async () => {
  const result = await KlevuFetch(categoryMerchandising("Women"))

  const query = result.queriesById("categoryMerchandising")

  expect(query).toBeDefined()
  expect(query?.getCategoryMerchandisingClickSendEvent).toBeDefined()
  expect(query?.getSearchClickSendEvent).toBeUndefined()
  expect(query?.getRecommendationClickSendEvent).toBeUndefined()

  const product = query!.records[0]

  const getSpySuccess = jest.spyOn(axios, "get").mockImplementation(() => {
    return new Promise((resolve, reject) => {
      return resolve({
        data: {},
      })
    })
  })

  query?.getCategoryMerchandisingClickSendEvent?.()(
    product.id,
    "Women",
    product.itemGroupId,
    {
      klevu_shopperIP: "192.168.0.1",
    }
  )

  expect(getSpySuccess).toHaveBeenCalledTimes(1)
  expect(getSpySuccess).toHaveBeenCalledWith(
    expect.stringContaining("klevu_shopperIP=192.168.0.1")
  )

  expect(KlevuLastClickedProducts.getLastClickedLatestsFirst()[0]).toBe(
    product.id
  )
})
