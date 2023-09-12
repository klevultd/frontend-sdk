import { KlevuBanner } from "../models/KMCBanner.js"

type KlevuBannerSearchType = "landingpage" | "quicksearch" | "merchandising"

export function KlevuGetBannersByType(
  banners: KlevuBanner[],
  searchType: KlevuBannerSearchType,
  termOrCategory: string
): KlevuBanner[] {
  const dateFiltered = filterBannersByDate(banners)

  const typeFiltered = dateFiltered.filter((banner) => {
    switch (searchType) {
      case "landingpage": {
        return banner.showOnLandingPage
      }
      case "quicksearch": {
        return banner.showOnQuickSearch
      }
      case "merchandising": {
        return banner.showOnCategoryPage
      }
    }
  })

  return filterBannersByTerm(typeFiltered, termOrCategory)
}

function filterBannersByTerm(
  banners: KlevuBanner[],
  term: string
): KlevuBanner[] {
  return banners.filter(
    (banner) =>
      banner.showForTerms === null || banner.showForTerms.includes(term)
  )
}

function filterBannersByDate(
  banners: KlevuBanner[],
  date: Date = new Date()
): KlevuBanner[] {
  return banners.filter((banner) => {
    const startDate = bannerDateToDate(banner.startDate)
    if (banner.endDate === "") {
      return startDate <= date
    }

    const endDate = bannerDateToDate(banner.endDate, true)
    return startDate <= date && endDate >= date
  })
}

function bannerDateToDate(date: string, end?: boolean): Date {
  const [year, month, day] = date.split("/")

  const jsDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

  if (end) {
    jsDate.setHours(23, 59, 59)
  }

  return jsDate
}
