import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { sendSearchEvent } from "./sendSearchEvent.js"
import axios from "axios"
import { jest } from "@jest/globals"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

// @todo check that event is properly sent. This just test that function can be used
test("Sending search event", async () => {
  const result = await KlevuFetch(
    search(
      "hoodies",
      {
        id: "test",
      },
      sendSearchEvent()
    )
  )

  expect(result.queriesById("test")).toBeDefined()
})

test("Override IP with custom data", async () => {
  const getSpySuccess = jest.spyOn(KlevuConfig.default!.axios!, "post")

  await KlevuFetch(
    search(
      "hoodies",
      {
        id: "test",
      },
      sendSearchEvent({
        klevu_shopperIP: "1.2.3.4",
      })
    )
  )

  expect(getSpySuccess).toHaveBeenCalledTimes(2)

  expect(
    (getSpySuccess.mock.calls[1][1] as any).get("klevu_shopperIP")
  ).toEqual("1.2.3.4")
})
