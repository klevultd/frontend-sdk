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
  /** Setting a acceent color to badge   */
  @Prop() accent?: number

  /** Setting a neutral color to badge   */
  @Prop() neutral?: number

  @Event({ composed: true }) klevuBadgeClose!: EventEmitter<void>

  render() {
    let style = {}

    if (this.accent || this.neutral) {
      style = {
        "--background": this.accent
          ? `var(--klevu-color-accent-${this.accent})`
          : `var(--klevu-color-neutral-${this.neutral})`,
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
