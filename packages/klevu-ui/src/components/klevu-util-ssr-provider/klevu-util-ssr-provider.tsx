import { KlevuApiRawResponse } from "@klevu/core"
import { Component, Host, Method, Prop, h } from "@stencil/core"

/**
 * KlevuUtilSsrProvider component stores the Klevu SSR response as a string
 * that can be hydrated in the client side.
 */
@Component({
  tag: "klevu-util-ssr-provider",
  shadow: true,
})
export class KlevuUtilSsrProvider {
  @Prop() html?: string
  @Prop({
    mutable: true,
    reflect: true,
  })
  packed?: string
  @Prop({
    mutable: true,
    reflect: true,
  })
  identifier?: string

  /**
   * packed parameter returned by KlevuSSRFetch function
   *
   * @param packed
   */
  @Method()
  async setPacked(packed: object) {
    this.packed = JSON.stringify(packed).replace(/"/g, "'")
  }

  /**
   *
   * @returns packed parameter returned by KlevuSSRFetch function for KlevuSSRHydrate function
   */
  @Method()
  async getPacked() {
    return JSON.parse(this.packed || "{}").replace(/'/g, '"')
  }

  render() {
    if (this.html) {
      return (
        <Host>
          <div innerHTML={this.html}></div>
        </Host>
      )
    }
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
