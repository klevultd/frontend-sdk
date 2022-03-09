import { KlevuFetchModifer } from ".."
import { KlevuEvents } from "../../events"

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

      console.log("sending search event with", f.params.term, meta)

      KlevuEvents.search(
        f.params.term,
        meta.totalResultsFound,
        meta.typeOfSearch
      )
    },
  }
}
