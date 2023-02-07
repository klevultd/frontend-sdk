import { KlevuConfig } from "@klevu/core"
import { Component, h, Host, Prop } from "@stencil/core"
import { KlevuUIGlobalSettings } from "../../utils/utils"

/**
 * Initializes components to fetch data from correct Klevu backend
 *
 *
 * Note: All global CSS variables are documented in `klevu-init` even thought they are not defined in it.
 * @cssprop --klevu-color-primary - Main color of components
 * @cssprop --klevu-color-primary-text - Text color on top primary color
 * @cssprop --klevu-color-primary-border - Border color related to primary color
 * @cssprop --klevu-color-secondary - Main color of components
 * @cssprop --klevu-color-secondary-text - Text color on top primary color
 * @cssprop --klevu-color-secondary-border - Border color related to primary color
 * @cssprop --klevu-color-border - Standard border color used to separate items
 * @cssprop --klevu-color-dim-background - Dimmed background color for default cases
 * @cssprop --klevu-color-dim-text - Secondary dimmed texts
 * @cssprop --klevu-color-shadow - When shadows are used (popups, etc) what color it should be
 * @cssprop --klevu-spacing-small - Small spacing
 * @cssprop --klevu-spacing-normal - Normal spacing
 * @cssprop --klevu-spacing-large - Large spacing
 * @cssprop --klevu-rounded-corners - Rounded corners
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
