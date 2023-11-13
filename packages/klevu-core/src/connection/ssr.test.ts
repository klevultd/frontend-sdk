import {
  KlevuConfig,
  KlevuSSRFetch,
  KlevuSSRHydrate,
  search,
  sendSearchEvent,
} from "../index.js"
import axios from "axios"
import { jest } from "@jest/globals"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
})

test("Make SSR search", async () => {
  const getSpySuccess = jest.spyOn(KlevuConfig.default!.axios!, "post")

  const functions = [search("hoodies", {}, sendSearchEvent())]

  const ssrResult = await KlevuSSRFetch(functions)
  expect(ssrResult.result.queryExists("search")).toBe(true)

  // first for the search
  expect(getSpySuccess).toHaveBeenCalledTimes(1)

  // emulate frontend hydration
  const responseObject = await KlevuSSRHydrate(
    ssrResult.packed,
    functions,
    ssrResult.identifier
  )

  // 2nd for running the send search event after hydration
  expect(getSpySuccess).toHaveBeenCalledTimes(2)

  expect(responseObject.queryExists("search")).toBe(true)
})
