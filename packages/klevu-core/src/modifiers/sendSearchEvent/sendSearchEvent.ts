import { KlevuFetchModifer } from "../index.js"
import { KlevuEvents } from "../../events/index.js"

/**
 * This modifier should be used in the case when user hits enter (or presses button) to see
 * all results from search.
 *
 * @category Modifier
 * @returns
 */
export function sendSearchEvent(): KlevuFetchModifer {
  return {
    klevuModifierId: "sendSearchEvent",
    onResult: (res, f) => {
      if (!f.params) {
        return res
      }

      const { id, term } = f.params

      if (!id || !term) {
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
