import { KlevuConfig, KlevuFetch, KlevuTypeOfRecord } from "../../index.js"
import { searchCms } from "./searchCms.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
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
  // expect(q?.records.length).toBeGreaterThan(0)
  // for (const r of q?.records ?? []) {
  //   expect(r.typeOfRecord).toBe(KlevuTypeOfRecord.Cms)
  // }
})
