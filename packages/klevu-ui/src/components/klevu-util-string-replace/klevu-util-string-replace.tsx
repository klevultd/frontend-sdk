import { Component, Host, Prop, Watch, h } from "@stencil/core"

/**
 * Can be used to replace string of values into the string marked with %s token.
 *
 * string can contain multiple %s tokens. Each of them will be replace by the values array
 * corresponding index.
 */
@Component({
  tag: "klevu-util-string-replace",
  shadow: true,
})
export class KlevuUtilStringReplace {
  /**
   * Replacing string which contains %s
   */
  @Prop() string!: string

  /**
   * Values that will replace the %s.
   */
  @Prop() values!: string[]

  render() {
    let copy = this.string
    for (const v of this.values) {
      copy = copy.replace("%s", v)
    }
    return copy
  }
}
