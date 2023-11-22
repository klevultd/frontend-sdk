import { KlevuApiRawResponse } from "../models/KlevuApiRawResponse.js"
import { KlevuFetchFunctionReturnValue } from "../queries/index.js"
import { KlevuFetchOption } from "./klevuFetch.js"
import { KlevuResponseQueryObject } from "./responseQueryObject.js"

/**
 * This class is used to access the response data from Klevu API
 * It builds up the state of the result and it can be used to do various things with the data
 */
export class KlevuResponseObject {
  apiResponse: KlevuApiRawResponse
  #functions: KlevuFetchFunctionReturnValue[]
  #queryObjects: { [id: string]: KlevuResponseQueryObject } = {}

  constructor(
    response: KlevuApiRawResponse,
    functions: KlevuFetchFunctionReturnValue[],
    options?: KlevuFetchOption,
    checkProcessedFunctions?: string
  ) {
    this.apiResponse = response
    this.#functions = functions

    if (
      checkProcessedFunctions &&
      this.packProcessedFunctionsToString() !== checkProcessedFunctions
    ) {
      throw new Error("Processed functions are not the same as on the backend")
    }

    this.#buildQueryObjects()
    for (const f of functions) {
      if (f.modifiers) {
        for (const modifier of f.modifiers) {
          if (!modifier.onResult) {
            continue
          }

          if (
            !options?.params.isSSR ||
            (options.params.isSSR && !modifier.ssrOnResultFE)
          ) {
            modifier.onResult(this, f)
          } else if (options?.params.FEHydrate && modifier.ssrOnResultFE) {
            modifier.onResult(this, f)
          }
        }
      }
    }
  }

  /**
   * Get suggestions by id
   *
   * @param id
   * @returns
   */
  suggestionsById(id: string) {
    return this.apiResponse.suggestionResults?.find((q) => q.id === id)
  }

  #buildQueryObjects() {
    for (const q of this.apiResponse.queryResults ?? []) {
      const func = this.#functions.find((f) =>
        f.queries?.some((qu) => q.id == qu.id || q.id == `${qu.id}-fallback`)
      )
      if (func) {
        this.#queryObjects[q.id] = new KlevuResponseQueryObject(this, q, func)
      }
    }
  }

  /**
   * Get query results by id
   * @param id query id used
   * @returns
   */
  queriesById(id: string) {
    if (!this.#queryObjects[id]) {
      throw new Error(`Query with id ${id} not found`)
    }
    return this.#queryObjects[id]
  }

  /**
   * Check if query exists. This should be used as queriesById can throw an error
   *
   * @param id query id used
   * @returns
   */
  queryExists(id: string) {
    return !!this.#queryObjects[id]
  }

  /**
   *
   * @returns String that can be used to compare if the same functions were used to create this response
   */
  packProcessedFunctionsToString() {
    return this.#functions
      .map(
        (f) =>
          `${f.klevuFunctionId},${f.queries?.map(
            (q) => q.id
          )},${f.modifiers?.map((m) => m.klevuModifierId)}`
      )
      .join(";")
  }
}
