import { KlevuTypeOfRequest } from "."
import { KlevuBaseQuery } from "./KlevuBaseQuery"

export type KlevuSuggestionQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.Suggestion
  query: string
  limit?: number
  hlStartElem?: string
  hlEndElem?: string
}
