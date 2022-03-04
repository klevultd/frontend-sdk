import { FilterManager } from "../store/filterManager"
import { KlevuSuggestionResult } from "./KlevuSuggestionResult"
import { KlevuApiRawResponse, KlevuQueryResult } from "./KlevuApiRawResponse"

export type KlevuFetchResponse = {
  apiResponse: null | KlevuApiRawResponse
  suggestionsById: (id: string) => KlevuSuggestionResult | undefined
  queriesById: (id: string) => KlevuQueryResult | undefined
  next?: (override?: {
    limit?: number
    filterManager?: FilterManager
  }) => Promise<KlevuFetchResponse>
}
