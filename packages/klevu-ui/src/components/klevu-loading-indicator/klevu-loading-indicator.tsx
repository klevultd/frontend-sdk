import { Component, Host, h } from "@stencil/core"

/**
 * Simple loading indicator
 *
 * @cssprop --klevu-loading-indicator-color --klevu-color-primary Color of the loading indicator
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
