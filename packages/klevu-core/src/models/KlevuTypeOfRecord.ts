import { LiteralUnion, ValueOf } from "type-fest"

export enum KlevuTypeOfRecord {
  Product = "KLEVU_PRODUCT",
  Cms = "KLEVU_CMS",
  Category = "KLEVU_CATEGORY",
}

export type KlevuAnyTypeOfRecord = LiteralUnion<
  ValueOf<typeof KlevuTypeOfRecord>,
  string
>
