import { KlevuConfig, KlevuFetch } from "../../index.js"
import { categoryMerchandising } from "../../queries/index.js"
import { sendMerchandisingViewEvent } from "./sendMerchandisingViewEvent.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
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

  result.queriesById("test")?.categoryMerchandisingClickEvent?.({
    productId: result.queriesById("test")?.records[0].id ?? "",
    categoryTitle: "Hoodies",
  })

  expect(result.queriesById("test")).toBeDefined()
})
