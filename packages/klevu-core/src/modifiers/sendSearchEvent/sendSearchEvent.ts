import { KlevuFetchModifer } from "../../models/KlevuFetchModifer.js"
import { KlevuEvents } from "../../events/index.js"
import { V1SearchEvent } from "../../events/eventRequests.js"

/**
 * This modifier should be used in the case when user hits enter (or presses button) to see
 * all results from search.
 *
 * @category Modifier
 * @returns
 */
export function sendSearchEvent(
  override?: Partial<V1SearchEvent>
): KlevuFetchModifer {
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

      KlevuEvents.search({
        term,
        totalResults: meta.totalResultsFound,
        typeOfSearch: meta.typeOfSearch,
        override,
      })

      return res
    },
  }
}
