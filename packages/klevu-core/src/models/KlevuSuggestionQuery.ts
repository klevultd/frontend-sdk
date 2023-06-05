import type { KlevuBaseQuery, KlevuTypeOfRequest } from "./index.js"

export type KlevuSuggestionQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.Suggestion
  /**
   * The search term or phrase for which the suggestions are retrieved from Klevu Search.
   */
  query: string
  /**
   * The maximum number of suggestions to be retrieved.
   */
  limit?: number
  /**
   * By default, the section of an autosuggestion matching what the customer has typed is highlighted in bold using values of '<b>' and </b>'. If you prefer something else, you can override these values with your own HTML.
   */
  hlStartElem?: string
  /**
   * By default, the section of an autosuggestion matching what the customer has typed is highlighted in bold using values of '<b>' and </b>'. If you prefer something else, you can override these values with your own HTML.
   */
  hlEndElem?: string
}
