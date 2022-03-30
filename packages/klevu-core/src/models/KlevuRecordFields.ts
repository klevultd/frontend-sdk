import { LiteralUnion } from "type-fest"
import { KlevuRecord } from "./KlevuRecord.js"

export type KlevuRecordFields = LiteralUnion<keyof KlevuRecord, string>
