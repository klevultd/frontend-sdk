import {
  listFilters,
  KlevuFetch,
  categoryMerchandising,
  KlevuConfig,
} from "@klevu/core"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const data = {}

  KlevuConfig.init({
    url: config.klevuUrl,
    apiKey: config.klevuApikey,
  })

  const initialFetch = async () => {
    const res = await KlevuFetch(
      categoryMerchandising(
        event.context.params.handle,
        {
          id: "search",
          limit: 36,
        },
        listFilters({
          rangeFilterSettings: [
            {
              key: "klevu_price",
              minMax: true,
            },
          ],
        })
      )
    )
    const searchResult = res.queriesById("search")
    if (searchResult) {
      data.showMore = Boolean(searchResult.next)
      data.products = searchResult.records ?? []
      data.numOfProducts = data.products.length
    }
  }

  await initialFetch()
  // console.log("heres data")
  // console.log(data.showMore, data.products.length)

  return {
    data,
  }
})
