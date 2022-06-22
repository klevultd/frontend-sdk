import {
  applyFilters,
  categoryMerchandising,
  KlevuFetch,
  KlevuFilterOrder,
  listFilters,
} from "@klevu/core"
import { printToOutput } from "./utils"

// the actual fetch function. Surrounded with debounce so that we are not spamming Klevu API
async function load() {
  const result = await KlevuFetch(
    categoryMerchandising(
      "women;bags",
      {
        id: "merchandising", // can be omitted. "merchandising" as default,
        fields: ["name", "price", "klevu_category"],
        limit: 4,
      },
      // List filters for this category
      listFilters({
        include: ["size", "color"], // only include size and color filters
        limit: 3, // just 3 options
        order: KlevuFilterOrder.Frequency, // three options with highest count
      })
    )
  )

  // the results
  const merchResult = result.queriesById("merchandising")

  // first print filters what we get from first query
  printToOutput(merchResult?.filters)

  // and then products
  printToOutput(merchResult?.records)

  // if we have more products (we do have)
  if (merchResult?.next) {
    // fetch more next page of products
    const nextResult = await merchResult.next()
    // and print them out too
    printToOutput(nextResult.queriesById("merchandising")?.records)
  }
}

load()
