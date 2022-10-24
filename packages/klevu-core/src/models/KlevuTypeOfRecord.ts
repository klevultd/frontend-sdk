import { LiteralUnion } from "../utils/literalUnion"
import { ValueOf } from "../utils/valuOf"

export enum KlevuTypeOfRecord {
  Product = "KLEVU_PRODUCT",
  Cms = "KLEVU_CMS",
  Category = "KLEVU_CATEGORY",
}

export type KlevuAnyTypeOfRecord = LiteralUnion<
  ValueOf<typeof KlevuTypeOfRecord>,
  string
>
