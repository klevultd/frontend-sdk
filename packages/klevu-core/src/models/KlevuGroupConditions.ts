export type KlevuGroupConditions = {
  /**
   * Defining the condition of filtering. Here are the options available.
   *
   * * ALL_OF:This is used to filter data using AND query i.e. the search results are matching with all the
   *   attributes.
   * * ANY_OF:This is used to filter data using OR query i.e. the search results are matching with at least one
   *   attributes.
   * * NONE_OF: This is used as negation AND query i.e.  when search results are matching with none of the attribute
   *   values.
   */
  groupOperator: "ALL_OF" | "ANY_OF" | "NONE_OF"

  /**
   * Conditions to be applied for filtering the search results.
   */
  conditions: Array<{
    /**
     * The ID of the attribute to filter by, eg. color, size, etc.
     */
    key: string

    /**
     * Defining an attribute's operation, Here are the options available.
     *
     * * INCLUDE : This is used to include specific attribute for the filter purpose.
     * * EXCLUDE :  This is used to exclude specific attribute for the filter purpose.
     */
    valueOperator: "INCLUDE" | "EXCLUDE"

    /**
     * The behaviour when specifying multiple filters or values.
     */
    singleSelect: boolean

    /**
     * For numeric filter like price, can be used to exclude data of the starting or ending values. For example if the
     * range is defined as "1200 - 1232" in values, and excludeValuesInResult is set to true, Klevu will use range as
     * “1201 - 1231“.
     *
     * This can be used to achieve greater than or less than condition. For example,if  you want to get the products
     * greater than price 200, the values field will be “200 - *“ and the excludeValuesInResult will be set to true.
     */
    excludeValuesInResult?: boolean

    /**
     * For numeric filter like price, can be used to exclude data of the starting or ending values. For example if the
     * range is defined as "1200 - 1232" in values, and excludeValuesInResult is set to true, Klevu will use range as
     *
     * “1201 - 1231“. This can be used to achieve greater than or less than condition. For example,if  you want to get
     * the products greater than price 200, the values field will be “200 - *“ and the excludeValuesInResult will be set
     * to true.
     */
    values: Array<string>
  }>
}
