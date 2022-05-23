import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { sendSearchEvent } from "./sendSearchEvent.js"
import axios from "axios"

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
