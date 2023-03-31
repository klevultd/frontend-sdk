import { Component, Host, Prop, h } from "@stencil/core"

/**
 * Container for chat items. Very simple component, just a wrapper.
 */
@Component({
  tag: "klevu-chat-bubble",
  styleUrl: "klevu-chat-bubble.css",
  shadow: true,
})
export class KlevuChatBubble {
  @Prop() remote?: boolean

  render() {
    return (
      <Host
        class={{
          remote: Boolean(this.remote),
        }}
      >
        <div>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
