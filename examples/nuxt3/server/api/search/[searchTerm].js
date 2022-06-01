import { KlevuFetch, search, sendSearchEvent, KlevuConfig } from "@klevu/core"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const data = {}

  KlevuConfig.init({
    url: config.klevuUrl,
    apiKey: config.klevuApikey,
  })

  console.log(event.context.params.searchTerm)

  const initialFetch = async () => {
    const res = await KlevuFetch(
      search(
        event.context.params.searchTerm,
        {
          id: "search",
          limit: 36,
        },
        sendSearchEvent()
      )
    )
    const searchResult = res.queriesById("search")
    if (!searchResult) {
      return data
    }

    data.showMore = Boolean(searchResult.next)
    data.products = searchResult.records ?? []
    data.numOfProducts = data.products.length
  }

  await initialFetch()

  return {
    data,
  }
})
