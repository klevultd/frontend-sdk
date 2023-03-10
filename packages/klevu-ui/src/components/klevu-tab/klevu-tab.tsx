import { Component, Host, Prop, h } from "@stencil/core"

/**
 * Very simple tab component
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

  render() {
    return (
      <Host>
        <button
          class={{
            active: Boolean(this.active),
          }}
        >
          <klevu-typography variant="body-s">{this.caption}</klevu-typography>
        </button>
      </Host>
    )
  }
}
