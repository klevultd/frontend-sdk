import { Component, Host, Prop, h } from "@stencil/core"

/**
 * Very simple tab component. Use like a button, but with a caption.
 * Use standard onClick event to handle click.
 */
@Component({
  tag: "klevu-tab",
  styleUrl: "klevu-tab.css",
  shadow: true,
})
export class KlevuTab {
  /**
   * Title of the tab
   */
  @Prop() caption!: string

  /**
   * Whether the tab is active
   */
  @Prop() active?: boolean

  /**
   * Whether the tab is disabled
   */
  @Prop() disabled?: boolean

  render() {
    return (
      <Host>
        <button
          class={{
            active: Boolean(this.active),
          }}
          disabled={Boolean(this.disabled)}
        >
          <klevu-typography variant="body-s">{this.caption}</klevu-typography>
        </button>
      </Host>
    )
  }
}
