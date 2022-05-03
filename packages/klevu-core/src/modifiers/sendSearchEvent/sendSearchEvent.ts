import { KlevuFetchModifer } from "../index.js"
import { KlevuEvents } from "../../events/index.js"

/**
 * This modifier should be used in the case when user hits enter (or presses button) to see
 * all results from search.
 *
 * @category Modifiers
 * @returns
 */
export function sendSearchEvent(): KlevuFetchModifer {
  return {
    klevuModifierId: "sendSearchEvent",
    onResult: (res, f) => {
      const { id, term } = f.params as { id: string; term: string }

      if (!f.params || !id) {
        return res
      }

      const meta = res.queriesById(id)?.meta
      if (!meta) {
        return res
      }

      KlevuEvents.search(term, meta.totalResultsFound, meta.typeOfSearch)

      return res
    },
  }
}
