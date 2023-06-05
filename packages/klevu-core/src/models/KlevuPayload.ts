import type { KlevuSuggestionQuery } from "./KlevuSuggestionQuery.js"
import type { KlevuAllRecordQueries } from "./KlevuAllRecordQueries.js"

export type KlevuPayload = {
  context: {
    apiKeys: string[]
  }
  recordQueries?: Array<KlevuAllRecordQueries>
  suggestions?: Array<KlevuSuggestionQuery>
}
