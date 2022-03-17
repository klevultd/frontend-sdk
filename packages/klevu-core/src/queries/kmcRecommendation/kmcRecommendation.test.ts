import { KlevuConfig, KlevuFetch, KlevuTypeOfRecord } from "../.."
import { kmcRecommendation } from "./kmcRecommendation"

beforeEach(() => {
  KlevuConfig.init({
    url: "", // this should work without url
    apiKey: "klevu-158755634955912036",
  })
})

test("KMC recommendation", async () => {
  const result = await KlevuFetch(
    kmcRecommendation("3a5580bf-c5b2-407e-acac-4a58ae730b64")
  )

  const q = result.queriesById("kmcrecommendation")

  expect(q).toBeDefined()
  expect(q?.records.length).toBeGreaterThan(0)
  for (const r of q?.records ?? []) {
    expect(r.typeOfRecord).toBe(KlevuTypeOfRecord.Product)
  }
})
