import { KlevuGetBannersByType } from "../../utils/getBannersByType.js"
import { KlevuKMCSettings } from "../kmc.js"
import { KlevuBanner } from "../kmcmodels/KMCBanner.js"
import { KlevuResponseQueryObject } from "../responseQueryObject.js"

export async function getBanners(
  responseObject: KlevuResponseQueryObject,
  searchType?: "landingpage" | "quicksearch"
): Promise<KlevuBanner[]> {
  if (
    !["search", "categoryMerchandising"].includes(
      responseObject.func.klevuFunctionId
    )
  ) {
    return []
  }

  const settings = await KlevuKMCSettings()

  if (!settings.banner) {
    return []
  }

  switch (responseObject.func.klevuFunctionId) {
    case "search": {
      if (!searchType) {
        throw new Error(
          "Search type (landingpage|quicksearch) is required for search query banners"
        )
      }
      const searchTerm = responseObject.func.params?.term

      if (!searchTerm) {
        throw new Error("Search term is required for search query banners")
      }

      return KlevuGetBannersByType(
        settings.banner.klevu_banner,
        searchType,
        searchTerm
      )
    }
    case "categoryMerchandising": {
      const category = responseObject.func.params?.category
      if (!category) {
        return []
      }

      return KlevuGetBannersByType(
        settings.banner.klevu_banner,
        "merchandising",
        category
      )
    }
  }

  throw new Error("Couldn't find banners for this query. Unknown query type.")
}
