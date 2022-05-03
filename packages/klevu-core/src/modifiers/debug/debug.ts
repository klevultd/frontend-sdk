import { KlevuFetchModifer } from "../index.js"

/**
 * Prints queries to console for easier debugging
 *
 * @category Modifiers
 * @returns
 */
export function debug(): KlevuFetchModifer {
  return {
    klevuModifierId: "debug",
    modifyAfter: (queries) => {
      console.log(JSON.stringify(queries, undefined, 2))
      return Array.from(queries)
    },
  }
}
