import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { KlevuRecord } from "@klevu/core"

@customElement("klevu-product")
export default class KlevuProduct extends LitElement {
  @property({
    type: Object,
  })
  product: KlevuRecord | undefined

  render() {
    if (!this.product) {
      return
    }
    return html`<div>
      <img src=${this.product.image} />
      <p>${this.product.name}</p>
    </div>`
  }
}
