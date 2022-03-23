import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { sendSearchEvent } from "./sendSearchEvent.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
  })
})

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
