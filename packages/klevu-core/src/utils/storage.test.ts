/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { KlevuConfig } from "../config.js"
import { KlevuStorage, StorageType } from "./storage.js"

const storageMock = (function () {
  let store: { [key: string]: string } = {}
  return {
    getItem: function (key: string) {
      return store[key]
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString()
    },
    clear: function () {
      store = {}
    },
    removeItem: function (key: string) {
      delete store[key]
    },
  }
})()
Object.defineProperty(window, "localStorage", { value: storageMock })
Object.defineProperty(window, "sessionStorage", { value: storageMock })

test("Test storage when consent is required and consent is given", async () => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    useConsent: true,
  })
  KlevuConfig.getDefault().setConsentGiven(true)
  const mockValue = "[testvalues]"

  KlevuStorage.setItem("test_key", mockValue)
  expect(KlevuStorage.getItem("test_key")).toBe(mockValue)
  KlevuStorage.removeItem("test_key")
  expect(KlevuStorage.getItem("test_key")).toBe(undefined)

  KlevuStorage.setItem("test_key", mockValue, StorageType.SESSION)
  expect(KlevuStorage.getItem("test_key", StorageType.SESSION)).toBe(mockValue)
  KlevuStorage.removeItem("test_key", StorageType.SESSION)
  expect(KlevuStorage.getItem("test_key")).toBe(undefined)
})

test("Test storage when consent is required and consent is not given", async () => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    useConsent: true,
  })
  KlevuConfig.getDefault().setConsentGiven(false)
  const mockValue = "[testvalues]"
  KlevuStorage.setItem("test_key", mockValue)
  console.log(KlevuStorage.getItem("test_key"))
  expect(KlevuStorage.getItem("test_key")).not.toBe(mockValue)
  KlevuStorage.removeItem("test_key")
  expect(KlevuStorage.getItem("test_key")).toBe(undefined)

  KlevuStorage.setItem("test_key", mockValue, StorageType.SESSION)
  expect(KlevuStorage.getItem("test_key", StorageType.SESSION)).not.toBe(
    mockValue
  )
  KlevuStorage.removeItem("test_key", StorageType.SESSION)
  expect(KlevuStorage.getItem("test_key", StorageType.SESSION)).toBe(undefined)
})

test("Test storage when consent is not required", async () => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    useConsent: false,
  })
  const mockValue = "[testvalues]"
  KlevuStorage.setItem("test_key", mockValue)
  expect(KlevuStorage.getItem("test_key")).toBe(mockValue)
  KlevuStorage.removeItem("test_key", StorageType.LOCAL)
  expect(KlevuStorage.getItem("test_key", StorageType.LOCAL)).toBe(undefined)

  KlevuStorage.setItem("test_key", mockValue, StorageType.SESSION)
  expect(KlevuStorage.getItem("test_key", StorageType.SESSION)).toBe(mockValue)
  KlevuStorage.removeItem("test_key", StorageType.SESSION)
  expect(KlevuStorage.getItem("test_key")).toBe(undefined)
})
