import type { KlevuFetchFunctionReturnValue } from "../queries/index.js"

export type KlevuFetchQueries = Array<
  Promise<KlevuFetchFunctionReturnValue> | KlevuFetchFunctionReturnValue
>
