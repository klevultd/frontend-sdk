import { KlevuSuggestionQuery } from "./KlevuSuggestionQuery"
import { KlevuAllRecordQueries } from "./KlevuAllRecordQueries"

export type KlevuPayload = {
  context: {
    apiKeys: string[]
  }
  recordQueries?: Array<KlevuAllRecordQueries>
  suggestions?: Array<KlevuSuggestionQuery>
}
