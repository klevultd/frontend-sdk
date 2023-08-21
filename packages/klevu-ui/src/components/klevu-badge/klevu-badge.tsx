import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core"

/**
 * Basic badge component. Can be used to display small information on top of other elements. Typically
 * used to display things on top of product.
 *
 * @slot default - Badge content
 * @cssprop --klevu-badge-background - Background color of the badge, if accent or neutral is not set
 * @cssprop --klevu-badge-border-radius --klevu-border-radius-xxl Border radius of the badge
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
        "--klevu-badge-background": this.accent
          ? `var(--klevu-color-accent-${this.accent})`
          : `var(--klevu-color-neutral-${this.neutral})`,
      }
    }

    return (
      <Host style={style}>
        <klevu-typography variant="body-xs">
          <slot></slot>
        </klevu-typography>
      </Host>
    )
  }
}
