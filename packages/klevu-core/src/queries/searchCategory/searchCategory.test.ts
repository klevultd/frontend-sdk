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
  for (const r of q?.records ?? []) {
    expect(r.typeOfRecord).toBe(KlevuTypeOfRecord.Category)
  }
})
