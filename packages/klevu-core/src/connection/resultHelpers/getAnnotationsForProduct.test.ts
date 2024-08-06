import axios from "axios"
import { KlevuConfig, KlevuFetch, search } from "../../index.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test.skip("Basic annotationsById", async () => {
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
