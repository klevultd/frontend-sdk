export type KlevuRangeFilterSettings = {
  /**
   * This is the identifier of your numerical attribute, eg. 'klevu_price'.
   */
  key: string
  /**
   * If set to true, the Klevu Search engine calculates the minimum and maximum
   * values for this filter for use with a slider.
   */
  minMax: boolean
  /**
   * If a positive value is provided, the Klevu Search engine will calculate
   * ranges for this value. For example a value of 100 would give ranges from 0
   * to 99, 100 to 299, etc.
   */
  rangeInterval?: number
}
