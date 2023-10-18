import { Component, Element, Host, Prop, State, getAssetPath, h } from "@stencil/core"
import preloadedIcons from "./preloaded-icons.json"

const cache = new Map<string, string>()

/**
 * Klevu icon component. Uses Google Material Icons.
 *
 */
@Component({
  tag: "klevu-icon",
  styleUrl: "klevu-icon.css",
  shadow: true,
  assetsDirs: ["assets"],
})
export class KlevuIcon {
  @Element() el!: HTMLElement

  /**
   * Name of the icon. Please use tokens of material icons
   */
  @Prop() name!: string

  @State() iconURL?: string
  @State() iconURLSvg?: string
  /**
   * Special kind of internal asset that has correct settings in the SVG itself
   */
  @State() iconAssetURL?: string
  @State() svgStyle?: {
    [key: string]: string
  }

  async connectedCallback() {
    const url = window["klevu_ui_settings"]?.icons?.[this.name]
    if (url?.endsWith(".svg")) {
      await this.#downloadFile(url)
    } else if (preloadedIcons.includes(this.name)) {
      this.iconAssetURL = getAssetPath("./assets/" + this.name + ".svg")
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

  async #downloadFile(url: string) {
    try {
      if (cache.has(url)) {
        this.iconURLSvg = cache.get(url)
      } else {
        const data = await window.fetch(url)
        if (data.status == 200) {
          this.iconURLSvg = await data.text()
          cache.set(url, this.iconURLSvg)
        }
      }
    } catch (e) {}
    const fontSize = getComputedStyle(this.el).fontSize
    this.svgStyle = {
      fill: getComputedStyle(this.el).color,
      height: fontSize,
      width: fontSize,
    }
  }

  render() {
    return (
      <Host>
        {this.iconURLSvg ? (
          <div style={this.svgStyle} innerHTML={this.iconURLSvg}></div>
        ) : this.iconAssetURL ? (
          <svg width="20" height="20">
            <use xlinkHref={`${this.iconAssetURL}#img`} href={`${this.iconAssetURL}#img`}></use>
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
