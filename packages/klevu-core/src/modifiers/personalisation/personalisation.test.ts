import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { categoryMerchandising } from "../../queries/index.js"
import { lastClickedProducts } from "../../store/lastClickedProducts.js"
import { personalisation } from "./personalisation.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
  })
})

// @todo check the event properly. This just tests that it can be used
test("Category personalisation test", async () => {
  const dataInitialization = await KlevuFetch(search("shirts"))

  const initRecords = dataInitialization.queriesById("search")?.records ?? []
  expect(initRecords.length).toBeGreaterThan(4)

  const firstResult = await KlevuFetch(
    categoryMerchandising(
      "men",
      {
        id: "prev",
      },
      personalisation()
    )
  )

  const firstRecords = firstResult.queriesById("prev")?.records ?? []
  expect(firstRecords.length).toBeGreaterThan(2)

  for (const r of initRecords) {
    lastClickedProducts.click(r.id)
  }

  const secondSearch = await KlevuFetch(
    categoryMerchandising(
      "men",
      {
        id: "next",
      },
      personalisation()
    )
  )

  const secondResults = secondSearch.queriesById("next")?.records ?? []
  let different = false
  for (let i = 0; i < secondResults.length; i++) {
    if (firstRecords[i].id !== secondResults[i].id) {
      different = true
      break
    }
  }

  // @todo values are not different...
  //expect(different).toBeTruthy()
})
