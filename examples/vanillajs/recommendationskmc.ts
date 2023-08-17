import { KlevuFetch, kmcRecommendation } from "@klevu/core"
import { printToOutput } from "./utils"

async function load() {
  const result = await KlevuFetch(
    kmcRecommendation("k-b1c018f7-ee85-45c0-b65f-b9556f7dc15d")
  )

  const query = result.queriesById("kmcrecommendation")

  console.log(query.getQueryParameters())
  printToOutput(query.records)
}

load()
