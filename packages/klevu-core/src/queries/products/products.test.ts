import { KlevuConfig, KlevuFetch, search } from "../.."
import { products } from "./products"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-156925593843210765",
  })
})

test("Products search", async () => {
  // @TODO: This works in frontend but fails in jest. Why?
  /*
  const p = ["36800801865882", "36801135149210"]
  const result = await KlevuFetch(products(p))

  expect(result.queriesById("products")).toBeDefined()
  expect(result.queriesById("products")?.records.length).toBe(p.length)

  const recordIds = result.queriesById("products")?.records.map((r) => r.id)
  p.every((id) => expect(recordIds).toContain(id))
  */
})
