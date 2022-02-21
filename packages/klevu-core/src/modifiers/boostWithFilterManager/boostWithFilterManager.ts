import { KlevuFetchModifer } from ".."
import { FilterManager } from "../../store/filterManager"
import { notEmpty } from "../../utils/notEmpty"

/**
 * Boost query with currect selection of filter manager
 *
 * @param manager Instance of filter manager to use for selection of current values
 * @param weights Tell the weight of each filter
 * @returns KlevuModifier that be used to modify query
 */
export function boostWithFilterManager(
  manager: FilterManager,
  weights: Array<{
    key: string
    weight: number
  }>
): KlevuFetchModifer {
  return {
    klevuModifierId: "boostWithFilterManager",
    modifyAfter: (queries) => {
      const copy = Array.from(queries)
      for (const q of queries) {
        if (!q.boost) {
          q.boost = {}
        }
        if (q.boost.filters) {
          throw Error(
            "Cannot boost with FilterManager if filters boost have been already set"
          )
        }

        q.boost.filters = weights
          .map((w) => {
            const values = manager.currentSelection(w.key)
            if (!values) {
              return undefined
            }
            return {
              key: w.key,
              values,
              weight: w.weight,
            }
          })
          .filter(notEmpty)
      }
      return copy
    },
  }
}
