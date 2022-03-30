import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { categoryMerchandising } from "../../queries/index.js"
import { sendMerchandisingViewEvent } from "./sendMerchandisingViewEvent.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
  })
})

// @todo check the event properly. This just tests that it can be used
test("Sending merchandising event", async () => {
  const result = await KlevuFetch(
    categoryMerchandising(
      "men;hoodies",
      {
        id: "test",
      },
      sendMerchandisingViewEvent("Hoodies", "men;hoodies")
    )
  )

  expect(result.queriesById("test")).toBeDefined()
})
