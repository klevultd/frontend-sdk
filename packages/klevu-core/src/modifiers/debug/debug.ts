import { KlevuFetchModifer } from "../index.js"

export function debug(): KlevuFetchModifer {
  return {
    klevuModifierId: "debug",
    modifyAfter: (queries) => {
      console.log(JSON.stringify(queries, undefined, 2))
      return Array.from(queries)
    },
  }
}
