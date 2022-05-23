import { KlevuConfig, KlevuFetch, products } from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
})

test("Products search", async () => {
  const p = ["36800801865882", "36801135149210"]
  const result = await KlevuFetch(products(p))

  expect(result.queriesById("products")).toBeDefined()
  expect(result.queriesById("products")?.records.length).toBe(p.length)

  const recordIds = result.queriesById("products")?.records.map((r) => r.id)
  p.every((id) => expect(recordIds).toContain(id))
})
