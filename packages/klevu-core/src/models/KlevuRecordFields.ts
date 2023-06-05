import type { LiteralUnion } from "../utils/literalUnion.js"
import type { KlevuRecord } from "./index.js"

export type KlevuRecordFields = LiteralUnion<keyof KlevuRecord, string>
