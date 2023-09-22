import { KlevuFetchModifer } from "../index.js"
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
        term:
          meta.klevuImageData?.processed &&
          meta.klevuImageData?.processed?.length > 0
            ? "KLEVU_IMAGE_SEARCH"
            : term,
        totalResults: meta.totalResultsFound,
        typeOfSearch: meta.typeOfSearch,
        override,
      })

      if (!f.params) {
        f.params = {}
      }
      f.params.searchSendEventSent = true

      return res
    },
  }
}
