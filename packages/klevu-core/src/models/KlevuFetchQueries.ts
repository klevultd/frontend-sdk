import type { KlevuFetchFunctionReturnValue } from "./KlevuFetchFunctionReturnValue.js"

export type KlevuFetchQueries = Array<
  Promise<KlevuFetchFunctionReturnValue> | KlevuFetchFunctionReturnValue
>
