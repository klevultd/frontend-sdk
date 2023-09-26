import { Component, Host, h } from "@stencil/core"

/**
 * Simple loading indicator
 *
 */
@Component({
  tag: "klevu-loading-indicator",
  styleUrl: "klevu-loading-indicator.css",
  shadow: true,
})
export class KlevuLoadingIndicator {
  render() {
    return (
      <Host>
        <div class="dot-pulse"></div>
      </Host>
    )
  }
}
