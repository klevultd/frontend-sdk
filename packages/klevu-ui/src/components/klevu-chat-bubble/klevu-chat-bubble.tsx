import { Component, Host, Prop, h } from "@stencil/core"

/**
 * Container for chat items. Very simple component, just a wrapper.
 *
 * @cssprop --klevu-chat-bubble-background --klevu-color-neutral-2 Background color of the bubble
 * @cssprop --klevu-chat-bubble-background-remote --klevu-color-primary Background color of the bubble when remote
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
        <klevu-typography variant="body-s">
          <slot></slot>
        </klevu-typography>
      </Host>
    )
  }
}
