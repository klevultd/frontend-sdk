/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { KlevuConfig } from "../config.js"
import { KlevuStorage, StorageType } from "./storage.js"

const defaultKeys = [
  "klevu-user-sessionId",
  "klevu-user-session_expiry",
  "klevu-user-segmentInfo",
]

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
  const dataProtectedKey = "dataProtectedKey"

  KlevuStorage.addKey(dataProtectedKey)
  expect(KlevuStorage.listKeys()).toStrictEqual([
    ...defaultKeys,
    dataProtectedKey,
  ])

  // Test data protected keys
  //local storage
  KlevuStorage.setItem(dataProtectedKey, mockValue)
  expect(KlevuStorage.getItem(dataProtectedKey)).toBe(mockValue)
  KlevuStorage.removeItem(dataProtectedKey)
  expect(KlevuStorage.getItem(dataProtectedKey)).toBe(undefined)

  KlevuStorage.removeKey(dataProtectedKey)
  expect(KlevuStorage.listKeys()).toStrictEqual([...defaultKeys])
  KlevuStorage.setItem(dataProtectedKey, mockValue)
  expect(KlevuStorage.getItem(dataProtectedKey)).toBe(mockValue)

  //session storage
  KlevuStorage.setItem(dataProtectedKey, mockValue, StorageType.SESSION)
  expect(KlevuStorage.getItem(dataProtectedKey, StorageType.SESSION)).toBe(
    mockValue
  )
  KlevuStorage.removeItem(dataProtectedKey, StorageType.SESSION)
  expect(KlevuStorage.getItem(dataProtectedKey)).toBe(undefined)

  // Test non-data protected keys
  //local storage
  const nonDataProtectedKey = "nonDataProtectedKey"
  KlevuStorage.setItem(nonDataProtectedKey, mockValue)
  expect(KlevuStorage.getItem(nonDataProtectedKey)).toBe(mockValue)
  KlevuStorage.removeItem(nonDataProtectedKey)
  expect(KlevuStorage.getItem(nonDataProtectedKey)).toBe(undefined)

  //session storage
  KlevuStorage.setItem(nonDataProtectedKey, mockValue, StorageType.SESSION)
  expect(KlevuStorage.getItem(nonDataProtectedKey, StorageType.SESSION)).toBe(
    mockValue
  )
  KlevuStorage.removeItem(nonDataProtectedKey, StorageType.SESSION)
  expect(KlevuStorage.getItem(nonDataProtectedKey)).toBe(undefined)
})

test("Test storage when consent is required and consent is not given", async () => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    useConsent: true,
  })
  KlevuConfig.getDefault().setConsentGiven(false)
  const mockValue = "[testvalues]"
  const dataProtectedKey = "dataProtectedKey"

  KlevuStorage.addKey(dataProtectedKey)
  expect(KlevuStorage.listKeys()).toStrictEqual([
    ...defaultKeys,
    dataProtectedKey,
  ])

  // Test data protected keys
  //local storage
  KlevuStorage.setItem(dataProtectedKey, mockValue)
  expect(KlevuStorage.getItem(dataProtectedKey)).toBe(null)
  KlevuStorage.removeItem(dataProtectedKey)
  expect(KlevuStorage.getItem(dataProtectedKey)).toBe(null)

  //session storage
  KlevuStorage.setItem(dataProtectedKey, mockValue, StorageType.SESSION)
  expect(KlevuStorage.getItem(dataProtectedKey, StorageType.SESSION)).toBe(null)
  KlevuStorage.removeItem(dataProtectedKey, StorageType.SESSION)
  expect(KlevuStorage.getItem(dataProtectedKey)).toBe(null)

  // Test non-data protected keys
  //local storage
  const nonDataProtectedKey = "nonDataProtectedKey"
  KlevuStorage.setItem(nonDataProtectedKey, mockValue)
  expect(KlevuStorage.getItem(nonDataProtectedKey)).toBe(mockValue)
  KlevuStorage.removeItem(nonDataProtectedKey)
  expect(KlevuStorage.getItem(nonDataProtectedKey)).toBe(undefined)

  //session storage
  KlevuStorage.setItem(nonDataProtectedKey, mockValue, StorageType.SESSION)
  expect(KlevuStorage.getItem(nonDataProtectedKey, StorageType.SESSION)).toBe(
    mockValue
  )
  KlevuStorage.removeItem(nonDataProtectedKey, StorageType.SESSION)
  expect(KlevuStorage.getItem(nonDataProtectedKey)).toBe(undefined)
})

test("Test storage when consent is required and consent is not needed", async () => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    useConsent: false,
  })
  const mockValue = "[testvalues]"
  const dataProtectedKey = "dataProtectedKey"

  KlevuStorage.addKey(dataProtectedKey)
  expect(KlevuStorage.listKeys()).toStrictEqual([
    ...defaultKeys,
    dataProtectedKey,
  ])

  // Test data protected keys
  //local storage
  KlevuStorage.setItem(dataProtectedKey, mockValue)
  expect(KlevuStorage.getItem(dataProtectedKey)).toBe(mockValue)
  KlevuStorage.removeItem(dataProtectedKey)
  expect(KlevuStorage.getItem(dataProtectedKey)).toBe(undefined)

  //session storage
  KlevuStorage.setItem(dataProtectedKey, mockValue, StorageType.SESSION)
  expect(KlevuStorage.getItem(dataProtectedKey, StorageType.SESSION)).toBe(
    mockValue
  )
  KlevuStorage.removeItem(dataProtectedKey, StorageType.SESSION)
  expect(KlevuStorage.getItem(dataProtectedKey)).toBe(undefined)

  // Test non-data protected keys
  //local storage
  const nonDataProtectedKey = "nonDataProtectedKey"
  KlevuStorage.setItem(nonDataProtectedKey, mockValue)
  expect(KlevuStorage.getItem(nonDataProtectedKey)).toBe(mockValue)
  KlevuStorage.removeItem(nonDataProtectedKey)
  expect(KlevuStorage.getItem(nonDataProtectedKey)).toBe(undefined)

  //session storage
  KlevuStorage.setItem(nonDataProtectedKey, mockValue, StorageType.SESSION)
  expect(KlevuStorage.getItem(nonDataProtectedKey, StorageType.SESSION)).toBe(
    mockValue
  )
  KlevuStorage.removeItem(nonDataProtectedKey, StorageType.SESSION)
  expect(KlevuStorage.getItem(nonDataProtectedKey)).toBe(undefined)
})
