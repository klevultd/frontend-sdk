import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core"

/**
 * Basic badge component. Can be used to display small information on top of other elements.
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

  @Prop() closable?: boolean

  @Event({ composed: true }) klevuBadgeClose!: EventEmitter<void>

  #close = () => {
    if (this.closable) {
      this.klevuBadgeClose.emit()
    }
  }

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
      <Host style={style} class={{ closable: Boolean(this.closable) }} onClick={this.#close.bind(this)}>
        {this.closable && <span part="material-icon">close</span>}
        <klevu-typography variant="body-xs">
          <slot></slot>
        </klevu-typography>
      </Host>
    )
  }
}
