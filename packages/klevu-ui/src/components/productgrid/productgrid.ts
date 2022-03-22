import { LitElement, css, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { KlevuFetch } from "@klevu/core"

@customElement("klevu-product-grid")
export class ProductGrid extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      color: red;
    }
  `

  // Render the UI as a function of component state
  render() {
    return html`<div>This is product grid</div>`
  }
}
