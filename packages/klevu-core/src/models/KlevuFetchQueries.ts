import { KlevuFetchOption } from "../connection/klevuFetch.js"
import type { KlevuFetchFunctionReturnValue } from "../queries/index.js"

export type KlevuFetchQueries = Array<
  Promise<KlevuFetchFunctionReturnValue> | KlevuFetchFunctionReturnValue
>

export type KlevuFetchQueriesWithOptions = Array<
  | Promise<KlevuFetchFunctionReturnValue>
  | KlevuFetchFunctionReturnValue
  | KlevuFetchOption
>
