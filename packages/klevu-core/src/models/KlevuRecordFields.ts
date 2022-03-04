import { LiteralUnion } from "type-fest"
import { KlevuRecord } from "./KlevuRecord"

/*
swatches:

*/

export type KlevuRecordFields = LiteralUnion<keyof KlevuRecord, string>
