import { KlevuRecord } from "@klevu/core"

export function getRecordHandle(record: KlevuRecord) {
  return record.url.replace(
    "https://hydrogen-demo-by-klevu.myshopify.com/products/",
    ""
  )
}
