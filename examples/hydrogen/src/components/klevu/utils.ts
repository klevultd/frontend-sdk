import { KlevuRecord } from "@klevu/core"

export function getRecordHandle(record: KlevuRecord) {
  return record.url.replace("https://klevu-qa.myshopify.com/products/", "")
}
