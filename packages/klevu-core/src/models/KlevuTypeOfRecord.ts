import type { LiteralUnion } from "../utils/literalUnion.js"
import type { ValueOf } from "../utils/valuOf.js"

export enum KlevuTypeOfRecord {
  Product = "KLEVU_PRODUCT",
  Cms = "KLEVU_CMS",
  Category = "KLEVU_CATEGORY",
  Image = "KLEVU_IMAGE",
}

export type KlevuAnyTypeOfRecord = LiteralUnion<
  ValueOf<typeof KlevuTypeOfRecord>,
  string
>
