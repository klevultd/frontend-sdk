/**
 * cleans query term to improve search results
 *
 * @param term search term to be cleaned
 */
export function cleanSearchQuery(term: string): string {
  return (
    term
      // whitespace
      .replace(/\s{2,}/g, " ")
      // extra spaces
      .replace(/\s\s+/g, " ")
      // white space in end
      .trim()
      // to lowercase
      .toLocaleLowerCase()
  )
}
