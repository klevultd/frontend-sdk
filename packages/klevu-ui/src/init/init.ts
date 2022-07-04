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

    if (!this.apiKey || !this.url) {
      throw new Error("apiKey and url attributes are required for klevu-init")
    }

    KlevuConfig.init({
      apiKey: this.apiKey,
      url: this.url,
    })
  }

  render() {
    return html`<slot></slot>`
  }
}
