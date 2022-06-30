import { KlevuConfig } from "@klevu/core"
import { html, css, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"

@customElement("klevu-init")
export class KlevuInit extends LitElement {
  @property()
  url: string = ""

  @property()
  apiKey: string = ""

  connectedCallback() {
    super.connectedCallback()

    // throw error if apikey and url are not defined
    console.log("init", this.apiKey, this.url)

    KlevuConfig.init({
      apiKey: this.apiKey,
      url: this.url,
    })
  }

  render() {
    return html`<slot></slot>`
  }
}
