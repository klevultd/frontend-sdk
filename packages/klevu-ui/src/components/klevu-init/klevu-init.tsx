import { KlevuConfig } from "@klevu/core"
import { Component, h, Host, Prop } from "@stencil/core"
import { KlevuUIGlobalSettings } from "../../utils/utils"

/**
 * Initializes components to fetch data from correct Klevu backend
 */
@Component({
  tag: "klevu-init",
  shadow: true,
})
export class KlevuInit {
  /**
   * Read only API key to Klevu
   */
  @Prop() apiKey!: string
  /**
   * Klevu Server URL
   */
  @Prop() url!: string
  /**
   * Global settings
   */
  @Prop() settings?: KlevuUIGlobalSettings

  async connectedCallback() {
    KlevuConfig.init({
      apiKey: this.apiKey,
      url: this.url,
    })

    if (this.settings) {
      // @ts-expect-error
      window["klevu_ui_settings"] = this.settings
    }
  }

  static ready() {
    return document.querySelector("klevu-init")?.componentOnReady()
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
