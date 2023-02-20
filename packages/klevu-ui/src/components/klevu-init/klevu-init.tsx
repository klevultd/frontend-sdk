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
 *
 * @cssprop --klevu-color-primary #2b4af7 The primary color
 * @cssprop --klevu-color-primary-darker #0d2ee8  Darker variant of primary color
 * @cssprop --klevu-color-neutral-01 #ffffff Background color
 * @cssprop --klevu-color-neutral-02 #f6f6f6
 * @cssprop --klevu-color-neutral-03 #ededed
 * @cssprop --klevu-color-neutral-04 #e3e3e3
 * @cssprop --klevu-color-neutral-05 #d6d6d6
 * @cssprop --klevu-color-neutral-06 #919191
 * @cssprop --klevu-color-neutral-07 #757575
 * @cssprop --klevu-color-neutral-08 #191919 Text color
 *
 * @cssprop --klevu-spacing-01 1px Spacing 01
 * @cssprop --klevu-spacing-02 4px Spacing 02
 * @cssprop --klevu-spacing-03 8px Spacing 03
 * @cssprop --klevu-spacing-04 12px Spacing 04
 * @cssprop --klevu-spacing-05 16px Spacing 05
 * @cssprop --klevu-spacing-06 24px Spacing 06
 * @cssprop --klevu-spacing-07 32px Spacing 07
 * @cssprop --klevu-spacing-08 40px Spacing 08
 * @cssprop --klevu-spacing-09 48px Spacing 09
 * @cssprop --klevu-spacing-10 64px Spacing 10
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

    // Inject material fonts to project
    const fontCssUrl =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    let element = document.querySelector(`link[href="${fontCssUrl}"]`)

    // Only inject the element if it's not yet present
    if (!element) {
      element = document.createElement("link")
      element.setAttribute("rel", "stylesheet")
      element.setAttribute("href", fontCssUrl)
      document.head.appendChild(element)
    }

    if (!Boolean(document.querySelector("#klevu-icons"))) {
      const style = document.createElement("style")
      style.id = "klevu-icons"
      style.appendChild(
        document.createTextNode(
          `
          ::part(material-icon) { font-family: "Material Symbols Rounded"; font-variation-settings: "FILL" 0, "wght" 600, "GRAD" 0, "opsz" 20; }
          ::part(material-icon-light) { font-family: "Material Symbols Rounded"; font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 20; }
          `
        )
      )
      document.head.appendChild(style)
    }
  }

  /**
   * To make sure that components in the page wait for klevu-init to run and set the settings this method is required to use.
   * In `connectedCallback()` function should call this method. So for example:
   *
   * ```
   * async connectedCallback() {
   *   await KlevuInit.ready()
   * }
   * ```
   *
   * @returns Promise when klevu-init is loaded
   */
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
