import { AllQueries } from ".."
import { KlevuApiResponse } from "./connection"

export class KlevuResponse {
  private response: KlevuApiResponse

  constructor(queries: AllQueries[], response: KlevuApiResponse) {
    this.response = response
  }

  getResponse() {
    return this.response
  }

  nextPage() {}
}
