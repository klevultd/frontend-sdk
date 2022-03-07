export type KlevuRecommendationBanner = {
  metadata: {
    title: string
    recsKey: string
    pageType: string // "HOME" @todo: type strongly
    logic: string // "RECENTLY_VIEWED" @tody: type strongly
    maxProducts: number
    productThreshold: number
    enabled: boolean
  }
  search: {
    basePath: string
    payload: string
  }
  templates: {
    base: string
  }
  styles: {
    base: string
  }
  scripts: {
    recsObject: any
  }
}
