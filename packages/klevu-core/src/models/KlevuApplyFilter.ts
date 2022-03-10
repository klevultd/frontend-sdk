/**
 * Apply Filter type for Klevu base query
 */
export type KlevuApplyFilter = {
  applyFilters?: {
    filters: Array<{
      key: string
      values: string[] | [number, number]
      settings?: {
        singleSelect: boolean
      }
    }>
  }
}
