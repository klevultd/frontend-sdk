import { KlevuConfig, KlevuFetch, products } from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Products search", async () => {
  const p = [
    "6fecbabf-2d78-49b3-b23f-350e280f44eb-6fecbabf-2d78-49b3-b23f-350e280f44eb-4",
    "ab144a92-9307-48a8-9300-19549a2a9884-ab144a92-9307-48a8-9300-19549a2a9884-1",
  ]
  const result = await KlevuFetch(products(p))

  expect(result.queriesById("products")).toBeDefined()
  expect(result.queriesById("products")?.records.length).toBe(p.length)

  const recordIds = result.queriesById("products")?.records.map((r) => r.id)
  p.every((id) => expect(recordIds).toContain(id))
})
