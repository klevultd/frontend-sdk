import { KlevuSuggestionQuery } from "./KlevuSuggestionQuery.js"
import { KlevuAllRecordQueries } from "./KlevuAllRecordQueries.js"

export type KlevuPayload = {
  context: {
    apiKeys: string[]
  }
  recordQueries?: Array<KlevuAllRecordQueries>
  suggestions?: Array<KlevuSuggestionQuery>
}
