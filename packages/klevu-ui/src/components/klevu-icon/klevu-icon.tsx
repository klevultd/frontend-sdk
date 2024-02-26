import { Component, Element, Host, Prop, State, getAssetPath, h } from "@stencil/core"
import preloadedIcons from "./preloaded-icons.json"
import { closestElement } from "../../utils/utils"

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
  /**
   * To be set to portal trigger element
   * when component is being used in a portal
   */
  @Prop() originElement?: HTMLElement

  @State() iconURL?: string
  @State() iconURLSvg?: string

  @State() svgStyle?: {
    [key: string]: string
  }

  async connectedCallback() {
    let init = closestElement("klevu-init", this.originElement || this.el) as HTMLKlevuInitElement
    if (!init) {
      console.warn("could not find closest init for ", this.name)
      const initFields = document.getElementsByTagName("klevu-init")
      if (initFields.length > 0) {
        init = initFields[0]
      }
    }
    const url = init?.settings?.icons?.[this.name]
    if (url?.endsWith(".svg")) {
      await this.#setIcon(url)
    } else if (preloadedIcons.includes(this.name)) {
      let path = window.location.origin
      if (init) {
        path = await init.getAssetsPath()
      }
      const url = `${path}/assets/${this.name}.svg`
      await this.#setIcon(url, false)
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

  async #setIcon(url: string, shouldAddStyles = true) {
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
    if (shouldAddStyles) {
      const fontSize = getComputedStyle(this.el).fontSize
      this.svgStyle = {
        fill: getComputedStyle(this.el).color,
        height: fontSize,
        width: fontSize,
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
