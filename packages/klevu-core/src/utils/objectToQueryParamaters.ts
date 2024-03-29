/**
 * transform object to query parameters
 *
 * @param params
 */
export function objectToQueryParameters(params: object) {
  let urlData = "?"
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue
    }
    urlData += `${key}=${encodeURIComponent(value)}&`
  }
  return urlData
}
