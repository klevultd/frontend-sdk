import { KlevuKMCSettings } from "../kmc.js"
import { KlevuKeywordUrlMap } from "../kmcmodels/KMCMaps.js"

export async function getRedirects(
  term: string
): Promise<KlevuKeywordUrlMap[]> {
  const settings = await KlevuKMCSettings()

  if (!settings.maps) {
    return []
  }

  return settings.maps.klevu_keywordUrlMap.filter((map) =>
    map.keywords.some((k) => k === term)
  )
}
