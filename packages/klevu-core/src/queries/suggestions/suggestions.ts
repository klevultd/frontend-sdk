import { KlevuFetchFunctionReturnValue } from "../index.js"
import { KlevuSuggestionQuery } from "../../models/KlevuSuggestionQuery.js"
import { KlevuTypeOfRequest } from "../../models/index.js"
import { cleanSearchQuery } from "../../utils/index.js"

type Options = { id: string } & Pick<
  KlevuSuggestionQuery,
  "limit" | "hlEndElem" | "hlStartElem"
>

const defaults: Options = {
  id: "suggestions",
  limit: 5,
}

/**
 * Return suggestion on given search term
 *
 * @category Queries
 * @param term search term
 * @param options
 * @returns
 */
export function suggestions(
  term: string,
  options?: Partial<Options>
): KlevuFetchFunctionReturnValue {
  const params: Options = {
    ...defaults,
    ...options,
  }

  const query: KlevuSuggestionQuery = {
    typeOfRequest: KlevuTypeOfRequest.Suggestion,
    query: cleanSearchQuery(term),
    ...params,
  }

  return {
    klevuFunctionId: "suggestions",
    suggestions: [query],
  }
}
