/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { KlevuConfig } from "../config.js"
import { LAST_CLICKED_STORAGE_KEY } from "../store/lastClickedProducts.js"
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

  KlevuStorage.setItem(LAST_CLICKED_STORAGE_KEY, mockValue)
  expect(KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY)).toBe(mockValue)
  KlevuStorage.removeItem(LAST_CLICKED_STORAGE_KEY)
  expect(KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY)).toBe(undefined)

  KlevuStorage.setItem(LAST_CLICKED_STORAGE_KEY, mockValue, StorageType.SESSION)
  expect(
    KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY, StorageType.SESSION)
  ).toBe(mockValue)
  KlevuStorage.removeItem(LAST_CLICKED_STORAGE_KEY, StorageType.SESSION)
  expect(KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY)).toBe(undefined)
})

test("Test storage when consent is required and consent is not given", async () => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    useConsent: true,
  })
  KlevuConfig.getDefault().setConsentGiven(false)
  const mockValue = "[testvalues]"
  KlevuStorage.setItem(LAST_CLICKED_STORAGE_KEY, mockValue)
  expect(KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY)).not.toBe(mockValue)
  KlevuStorage.removeItem(LAST_CLICKED_STORAGE_KEY)
  expect(KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY)).toBe(undefined)

  KlevuStorage.setItem(LAST_CLICKED_STORAGE_KEY, mockValue, StorageType.SESSION)
  expect(
    KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY, StorageType.SESSION)
  ).not.toBe(mockValue)
  KlevuStorage.removeItem(LAST_CLICKED_STORAGE_KEY, StorageType.SESSION)
  expect(
    KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY, StorageType.SESSION)
  ).toBe(undefined)
})

test("Test storage when consent is not required", async () => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    useConsent: false,
  })
  const mockValue = "[testvalues]"
  KlevuStorage.setItem(LAST_CLICKED_STORAGE_KEY, mockValue)
  expect(KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY)).toBe(mockValue)
  KlevuStorage.removeItem(LAST_CLICKED_STORAGE_KEY, StorageType.LOCAL)
  expect(
    KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY, StorageType.LOCAL)
  ).toBe(undefined)

  KlevuStorage.setItem(LAST_CLICKED_STORAGE_KEY, mockValue, StorageType.SESSION)
  expect(
    KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY, StorageType.SESSION)
  ).toBe(mockValue)
  KlevuStorage.removeItem(LAST_CLICKED_STORAGE_KEY, StorageType.SESSION)
  expect(KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY)).toBe(undefined)
})
