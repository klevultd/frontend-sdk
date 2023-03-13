import { KlevuConfig, KlevuFetch, KlevuTypeOfRecord } from "../../index.js"
import { kmcRecommendation } from "./kmcRecommendation.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "", // this should work without url
    apiKey: "klevu-158755634955912036",
    axios,
  })
})

/**
 * @todo: Find new way of testing this as recommendation can be deleted in backend and then it doesn't work anymore
 */
test.skip("KMC recommendation", async () => {
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
