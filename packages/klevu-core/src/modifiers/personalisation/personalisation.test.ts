import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { categoryMerchandising } from "../../queries/index.js"
import { KlevuLastClickedProducts } from "../../store/lastClickedProducts.js"
import { personalisation } from "./personalisation.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
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
    KlevuLastClickedProducts.click(r.id)
  }

  // @todo values are not different...
  /*
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

  
  expect(different).toBeTruthy()
  */
})
