import axios from "axios"
import { KlevuConfig, KlevuFetch, search } from "../../index.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
})

test("Basic annotationsById", async () => {
  const result = await KlevuFetch(
    search("blue", {
      id: "test",
    })
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
  const resultAnnotation = await result
    .queriesById("test")
    ?.annotationsById?.("36800798556314", "en")
  expect(resultAnnotation?.annotations?.subjects?.length).toBeGreaterThan(0)
})
