import { KlevuRecord } from "@klevu/core"
import { css, html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"

export type ProductRecord = Partial<KlevuRecord>

export type KlevuProductAnalyticsFunctionClick = (
  record: ProductRecord,
  event: Event
) => void | boolean

@customElement("klevu-product")
export class KlevuProduct extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--klevu-spacing-m);
      margin: var(--klevu-spacing-m);
      border: 1px solid var(--klevu-color-secondary);
      border-radius: var(--klevu-roundness);
      width: 200px;
    }

    a {
      display: block;
      color: var(--klevu-color-text, #000);
      text-decoration: none;
    }

    img {
      width: 100%;
    }

    .name {
      font-size: 1.2rem;
      height: 2.4rem;
    }

    .price {
      font-size: 2rem;
    }
  `

  @property({
    type: Object,
  })
  data?: ProductRecord

  @property({
    attribute: false,
  })
  klevuanalyticsclick?: KlevuProductAnalyticsFunctionClick

  private productclick(event: Event) {
    if (this.klevuanalyticsclick && this.data) {
      return this.klevuanalyticsclick(this.data, event)
    }
  }

  render() {
    if (!this.data) {
      return null
    }

    const priceFormatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: this.data.currency,
    })

    const image = this.data.image
      ? html`<img src="${this.data.image}" alt="${this.data.name ?? ""}" />`
      : null

    return html`<a href="${this.data.url ?? ""}" @click=${this.productclick}>
      ${image}
      <p class="name">${this.data.name}</p>
      <p class="price">
        ${priceFormatter.format(parseFloat(this.data.price ?? "0"))}
      </p>
    </a>`
  }
}
