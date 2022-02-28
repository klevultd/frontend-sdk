import { KlevuConfig, KlevuFetch, KlevuTypeOfRecord, search } from "../.."
import { searchCategory } from "./searchCategory"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-156925593843210765",
  })
})

test("Basic search", async () => {
  const result = await KlevuFetch(
    searchCategory("*", {
      id: "test",
    })
  )

  const q = result.queriesById("test")

  expect(q).toBeDefined()
  expect(q?.records.length).toBeGreaterThan(0)
  expect(q?.records[0].typeOfRecord).toBe(KlevuTypeOfRecord.Category)
})
