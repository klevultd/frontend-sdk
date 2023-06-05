import type { LiteralUnion } from "../utils/literalUnion.js"
import type { KlevuRecord } from "./KlevuRecord.js"

export type KlevuRecordFields = LiteralUnion<keyof KlevuRecord, string>
