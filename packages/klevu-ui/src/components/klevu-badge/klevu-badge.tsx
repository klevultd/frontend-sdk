import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core"

/**
 * Basic badge component. Can be used to display small information on top of other elements. Typically
 * used to display things on top of product.
 *
 * @slot default - Badge content
 * @csspart badge-content The content of the badge
 * @csspart badge-base The container of the badge
 */
@Component({
  tag: "klevu-badge",
  styleUrl: "klevu-badge.css",
  shadow: true,
})
export class KlevuBadge {
  /** Setting a accent color to badge (1-4)  */
  @Prop() accent?: number

  /** Setting a neutral color to badge (1-8)  */
  @Prop() neutral?: number

  render() {
    let style = {}

    if (this.accent || this.neutral) {
      style = {
        "--background": this.accent
          ? `var(--klevu-color-accent-${this.accent})`
          : `var(--klevu-color-neutral-${this.neutral})`,
        "--klevu-typography-color":
          this.neutral && this.neutral > 6 ? "var(--klevu-color-neutral-1)" : "var(--klevu-typography-color)",
      }
    }

    return (
      <div style={style} part="badge-base">
        <klevu-typography variant="body-xs">
          <span part="badge-content">
            <slot></slot>
          </span>
        </klevu-typography>
      </div>
    )
  }
}
