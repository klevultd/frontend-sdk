import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { sendSearchEvent } from "./sendSearchEvent.js"
import axios from "axios"
import { jest } from "@jest/globals"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
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
  const getSpySuccess = jest
    .spyOn(KlevuConfig.default!.axios!, "get")
    .mockImplementation(() => {
      return new Promise((resolve, reject) => {
        return resolve({
          data: {},
        })
      })
    })

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

  expect(getSpySuccess).toHaveBeenCalledTimes(1)
  expect(getSpySuccess).toHaveBeenCalledWith(
    expect.stringContaining("klevu_shopperIP=1.2.3.4")
  )
})
