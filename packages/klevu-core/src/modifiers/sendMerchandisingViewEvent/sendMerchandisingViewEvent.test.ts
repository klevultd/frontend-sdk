import { KlevuConfig, KlevuFetch } from "../../index.js"
import { categoryMerchandising } from "../../queries/index.js"
import { sendMerchandisingViewEvent } from "./sendMerchandisingViewEvent.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
})

// @todo check the event properly. This just tests that it can be used
test("Sending merchandising event", async () => {
  const result = await KlevuFetch(
    categoryMerchandising(
      "men",
      {
        id: "test",
      },
      sendMerchandisingViewEvent("Hoodies")
    )
  )

  const click = result
    .queriesById("test")
    ?.getCategoryMerchandisingClickSendEvent?.()
  click?.(result.queriesById("test")?.records[0].id ?? "", "Hoodies")

  expect(result.queriesById("test")).toBeDefined()
})
