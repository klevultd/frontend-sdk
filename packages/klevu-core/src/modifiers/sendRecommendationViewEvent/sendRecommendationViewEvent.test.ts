import {
  KlevuConfig,
  KlevuFetch,
  KMCRecommendationLogic,
  sendRecommendationViewEvent,
  similarProducts,
} from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Sending recommendation view event", async () => {
  const result = await KlevuFetch(
    similarProducts(
      ["36800412713114"],
      {
        id: "test",
      },
      sendRecommendationViewEvent({
        logic: KMCRecommendationLogic.Similar,
        recsKey: "similar_test",
        title: "Similar products test",
      })
    )
  )
  expect(result.queriesById("test")).toBeDefined()
})

test("Recommendation view should fail", async () => {
  try {
    await KlevuFetch(
      similarProducts(
        ["36800412713114"],
        {
          id: "test",
        },
        sendRecommendationViewEvent({
          title: "Similar products test",
          logic: KMCRecommendationLogic.Similar,
          recsKey: "similar_test",
        })
      )
    )
  } catch (e: any) {
    expect(e.message).toMatch(
      "Need to provider eventData parameter for custom view events"
    )
  }
})
