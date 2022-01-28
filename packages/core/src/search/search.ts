import {
  KlevuRequest,
  KlevuSearchRecordQuery,
  KlevuTypeOfRequest,
} from "../connection"

export async function search(params: KlevuSearchRecordQuery["settings"]) {
  const query: KlevuSearchRecordQuery = {
    id: `klevu-${new Date().getTime()}`,
    typeOfRequest: KlevuTypeOfRequest.Search,
    settings: params,
  }

  return await KlevuRequest([query])
}
