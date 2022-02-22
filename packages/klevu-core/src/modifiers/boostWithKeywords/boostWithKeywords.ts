import { KlevuFetchModifer } from ".."

/**
 * Boost or deboost query based on a keywords.
 *
 * @category Modifiers
 * @param keywords Keywords to boost and deboost
 * @returns KlevuModifier that be used to modify query
 */
export function boostWithKeywords(
  keywords: Array<{
    /**
     * phrase to boost or debost
     */
    phrase: string
    /**
     * The boosting value to be applied, a decimal between 0 - 999. Please
     * specify values above 1 for boosting the records up the rankings, and a
     * value of 0 to 1 to de-boost records down the rankings.
     */
    weight: number
  }>
): KlevuFetchModifer {
  return {
    klevuModifierId: "boostWithKeywords",
    modifyAfter: (queries) => {
      const copy = Array.from(queries)
      for (const q of queries) {
        if (!q.boost) {
          q.boost = {}
        }
        if (!q.boost.keywords) {
          q.boost.keywords = keywords
        } else {
          q.boost.keywords.push(...keywords)
        }
      }
      return copy
    },
  }
}
