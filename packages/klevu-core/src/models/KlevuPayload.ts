import type { KlevuSuggestionQuery, KlevuAllRecordQueries } from "./index.js"

export type KlevuPayload = {
  context: {
    apiKeys: string[]
  }
  recordQueries?: Array<KlevuAllRecordQueries>
  suggestions?: Array<KlevuSuggestionQuery>
}
