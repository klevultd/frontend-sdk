import { KlevuConfig } from "../config.js"
import { KlevuFetchCache } from "./klevuFetchCache.js"
import axios from "axios"

type TestKey = {
  key: string
}

type TestCachedObject = {
  test: string
}

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
})

const key: TestKey = {
  key: "foobar",
}

const data: TestCachedObject = {
  test: "hello world",
}

test("Caching", () => {
  const cache = new KlevuFetchCache<TestKey, TestCachedObject>()
  expect(cache.check(key, true)).toBe(undefined)
  cache.cache(key, data)
  expect(cache.check(key, true)).toEqual(data)
})

test("Cache time", async () => {
  const cache = new KlevuFetchCache<TestKey, TestCachedObject>()
  expect(cache.check(key, true)).toBe(undefined)
  cache.cache(key, data, 10)
  await new Promise((r) => setTimeout(r, 50))
  expect(cache.check(key, true)).toEqual(undefined)

  cache.cache(key, data, 500)
  await new Promise((r) => setTimeout(r, 50))
  expect(cache.check(key, true)).toEqual(data)
})
