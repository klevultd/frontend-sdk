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
  @State() svgStyle?: {
    [key: string]: string
  }

  async connectedCallback() {
    const url = window["klevu_ui_settings"]?.icons?.[this.name]
    if (url?.endsWith(".svg")) {
      try {
        const data = await window.fetch(url)
        this.iconURLSvg = await data.text()
        const fontSize = getComputedStyle(this.el).fontSize
        this.svgStyle = {
          fill: getComputedStyle(this.el).color,
          height: fontSize,
          width: fontSize,
        }
      } catch (e) {}
    } else if (url) {
      this.iconURL = url
    }
    if (!this.iconURL && !this.iconURLSvg) {
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
          <div style={this.svgStyle} innerHTML={this.iconURLSvg}></div>
        ) : this.iconURL ? (
          <img src={this.iconURL} />
        ) : (
          <span>{this.name}</span>
        )}
      </Host>
    )
  }
}
