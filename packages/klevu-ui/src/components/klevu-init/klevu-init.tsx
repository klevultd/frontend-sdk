import { KlevuConfig } from "@klevu/core"
import { Component, Host, h, Prop } from "@stencil/core"
import { KlevuUIGlobalSettings } from "../../utils/utils"

@Component({
  tag: "klevu-init",
  shadow: true,
})
export class KlevuInit {
  @Prop() apiKey!: string
  @Prop() url!: string
  @Prop() settings?: KlevuUIGlobalSettings

  async connectedCallback() {
    KlevuConfig.init({
      apiKey: this.apiKey,
      url: this.url,
    })

    if (this.settings) {
      window["klevu_ui_settings"] = this.settings
    }
  }

  static ready() {
    return document.querySelector("klevu-init").componentOnReady()
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
