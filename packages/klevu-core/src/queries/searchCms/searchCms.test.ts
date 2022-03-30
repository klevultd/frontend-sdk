import { KlevuConfig, KlevuFetch, KlevuTypeOfRecord } from "../../index.js"
import { searchCms } from "./searchCms.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
  })
})

test("Basic search", async () => {
  const result = await KlevuFetch(
    searchCms("*", {
      id: "test",
    })
  )

  const q = result.queriesById("test")

  expect(q).toBeDefined()
  expect(q?.records.length).toBeGreaterThan(0)
  for (const r of q?.records ?? []) {
    expect(r.typeOfRecord).toBe(KlevuTypeOfRecord.Cms)
  }
})
