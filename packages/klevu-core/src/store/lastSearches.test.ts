import { KlevuLastSearches } from "./lastSearches.js"

test("Adding terms", () => {
  KlevuLastSearches.save("test")
  expect(KlevuLastSearches.get().length).toBe(1)
  expect(KlevuLastSearches.get()[0].term).toBe("test")
})

test("Order is correct", () => {
  KlevuLastSearches.save("test2")
  expect(KlevuLastSearches.get().length).toBe(2)
  expect(KlevuLastSearches.get()[1].term).toBe("test2")
})

test("Same search should move to latest", () => {
  KlevuLastSearches.save("test")
  expect(KlevuLastSearches.get().length).toBe(2)
  expect(KlevuLastSearches.get()[1].term).toBe("test")
})

test("Over last 5 is not returned", () => {
  KlevuLastSearches.save("test3")
  KlevuLastSearches.save("test4")
  KlevuLastSearches.save("test5")
  KlevuLastSearches.save("test6")
  expect(KlevuLastSearches.get().length).toBe(5)
  expect(KlevuLastSearches.get()[4].term).toBe("test6")
})
