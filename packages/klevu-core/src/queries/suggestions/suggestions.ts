import { KlevuFetchFunction } from ".."
import {
  KlevuDefaultOptions,
  KlevuSuggestionQuery,
} from "../../connection/queryModels"
import { KlevuTypeOfRequest } from "../../model"
import { KlevuFetchModifer } from "../../modifiers"
import { cleanSearchQuery } from "../../utils"

type Options = KlevuDefaultOptions &
  Pick<KlevuSuggestionQuery, "limit" | "hlEndElem" | "hlStartElem">

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
): KlevuFetchFunction {
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
