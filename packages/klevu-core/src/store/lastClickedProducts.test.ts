import { KlevuConfig } from "../index.js"
import { KlevuRecord } from "../models/KlevuRecord.js"
import { KlevuLastClickedProducts } from "./lastClickedProducts.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    disableClickTrackStoring: false,
  })
})

test("Product is added last clicks", () => {
  KlevuLastClickedProducts.click("1", {
    id: "1",
    name: "product",
  } as KlevuRecord)

  expect(KlevuLastClickedProducts.getProducts(1).length).toBe(1)
})

test("Products are received in reversed order", () => {
  KlevuLastClickedProducts.click("2", {
    id: "2",
    name: "product 2",
  } as KlevuRecord)

  expect(KlevuLastClickedProducts.getProducts().length).toBe(2)
  expect(KlevuLastClickedProducts.getProducts(1)[0].id).toBe("2")
  expect(KlevuLastClickedProducts.getLastClickedLatestsFirst(1)[0]).toBe("2")
})

test("Category caching works", () => {
  // under three products should not return anything
  expect(
    KlevuLastClickedProducts.getCategoryPersonalisationIds("foo").length
  ).toBe(0)

  KlevuLastClickedProducts.click("3", {
    id: "3",
    name: "product 3",
  } as KlevuRecord)

  expect(
    KlevuLastClickedProducts.getCategoryPersonalisationIds("foo").length
  ).toBe(3)
})

test("Cache should work", () => {
  KlevuLastClickedProducts.click("4", {
    id: "4",
    name: "product 4",
  } as KlevuRecord)

  expect(
    KlevuLastClickedProducts.getCategoryPersonalisationIds("foo").length
  ).toBe(3)
})

test("Disabled click tracking should return empty array", () => {
  KlevuConfig.getDefault().disableClickTracking = true

  KlevuLastClickedProducts.click("4", {
    id: "4",
    name: "product 4",
  } as KlevuRecord)
  expect(
    KlevuLastClickedProducts.getCategoryPersonalisationIds("foo").length
  ).toBe(0)
  expect(KlevuLastClickedProducts.getProducts(1).length).toBe(0)
  expect(KlevuLastClickedProducts.getLastClickedLatestsFirst(1).length).toBe(0)
})

test("Duplicates are filtered", () => {
  KlevuConfig.getDefault().disableClickTracking = false

  KlevuLastClickedProducts.click("5", {
    id: "5",
    name: "product 5",
  } as KlevuRecord)

  KlevuLastClickedProducts.click("5", {
    id: "5",
    name: "product 5",
  } as KlevuRecord)

  KlevuLastClickedProducts.click("5", {
    id: "5",
    name: "product 5",
  } as KlevuRecord)

  const lastClickedProducts =
    KlevuLastClickedProducts.getLastClickedLatestsFirst(20, true)

  expect(lastClickedProducts.filter((item) => item === "5").length).toBe(1)
})
