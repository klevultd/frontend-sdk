import { LiteralUnion } from "type-fest"
import { KlevuRecord } from "./KlevuRecord.js"

/*
swatches:

*/

export type KlevuRecordFields = LiteralUnion<keyof KlevuRecord, string>
