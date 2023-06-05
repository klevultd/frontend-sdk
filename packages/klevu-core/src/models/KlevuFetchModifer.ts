import {
  KlevuAllRecordQueries,
  KlevuFetchFunctionReturnValue,
  KlevuFetchResponse,
  KlevuModifierId,
} from "./index.js"
import { LiteralUnion } from "../utils/literalUnion.js"

/**
 * @ignore
 */

export type KlevuFetchModifer = {
  klevuModifierId: LiteralUnion<KlevuModifierId, string>
  modifyAfter?: (
    queries: Readonly<KlevuAllRecordQueries[]>,
    func: KlevuFetchFunctionReturnValue
  ) => Promise<KlevuAllRecordQueries[]>
  onResult?: (
    response: Readonly<KlevuFetchResponse>,
    query: KlevuFetchFunctionReturnValue
  ) => KlevuFetchResponse
}
