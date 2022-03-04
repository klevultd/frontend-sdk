import { KlevuTypeOfRequest } from "."
import { KlevuBaseQuery } from "./KlevuBaseQuery"
import { KlevuAlsoViewedQuery } from "./KlevuAlsoViewedQuery"

export type KlevuAlsoBoughtQuery = KlevuBaseQuery &
  KlevuAlsoViewedQuery & {
    typeOfRequest: KlevuTypeOfRequest.AlsoBought
  }
