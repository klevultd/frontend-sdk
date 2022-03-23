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
      if (!f.params || !f.params?.id) {
        return
      }

      const meta = res.queriesById(f.params.id)?.meta
      if (!meta) {
        return
      }

      KlevuEvents.search(
        f.params.term,
        meta.totalResultsFound,
        meta.typeOfSearch
      )
    },
  }
}
