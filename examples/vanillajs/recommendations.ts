import { KlevuFetch, trendingCategoryProducts } from "@klevu/core"
import { printToOutput } from "./utils"

async function load() {
  const result = await KlevuFetch(trendingCategoryProducts("women;bags"))

  printToOutput(result.queriesById("trendingCategoryProducts")?.records)
}

load()
