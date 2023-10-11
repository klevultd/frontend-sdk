export enum KlevuTypeOfRequest {
  Search = "SEARCH",
  Suggestion = "AUTO_SUGGESTIONS",
  CategoryNavigation = "CATNAV",
  NewArrivals = "RECS_NEW_ARRIVALS",
  SimilarProducts = "RECS_SIMILAR",
  Trending = "RECS_TRENDING",
  AlsoViewed = "RECS_ALSO_VIEWED",
  AlsoBought = "RECS_ALSO_BOUGHT",
  VisuallySimilar = "RECS_SIMILAR_IMAGES",
  Custom = "RECS_CUSTOM",
  // Special type where we skip request to Klevu services, but run everything else
  Skip = "SKIP",
}
