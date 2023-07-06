import { Component, Element, Host, Prop, State, h } from "@stencil/core"

/**
 * Klevu icon component. Uses Google Material Icons.
 *
 */
@Component({
  tag: "klevu-icon",
  styleUrl: "klevu-icon.css",
  shadow: true,
})
export class KlevuIcon {
  @Element() el!: HTMLElement

  /**
   * Name of the icon. Please use tokens of material icons
   */
  @Prop() name!: string

  @State() iconURL?: string
  @State() iconURLSvg?: string
  @State() svgColor?: string

  async connectedCallback() {
    const url = window["klevu_ui_settings"]?.icons?.[this.name]
    if (url?.endsWith(".svg")) {
      /*
      const data = await window.fetch(url)
      console.log(data)
      */
      this.iconURLSvg = url
      this.svgColor = getComputedStyle(this.el).color
    } else if (url) {
      this.iconURL = url
    }
    if (!url) {
      // Inject material fonts to project
      const fontCssUrl =
        "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20,600,0,0"
      let element = document.querySelector(`link[href="${fontCssUrl}"]`)

      // Only inject the element if it's not yet present
      if (!element) {
        element = document.createElement("link")
        element.setAttribute("rel", "stylesheet")
        element.setAttribute("href", fontCssUrl)
        document.head.appendChild(element)
      }
    }
  }

  render() {
    return (
      <Host>
        {this.iconURLSvg ? (
          <svg viewBox="0 0 14 16" width="50">
            <use href={this.iconURLSvg} fill={this.svgColor} />
          </svg>
        ) : this.iconURL ? (
          <img src={this.iconURL} />
        ) : (
          <span>{this.name}</span>
        )}
      </Host>
    )
  }
}
