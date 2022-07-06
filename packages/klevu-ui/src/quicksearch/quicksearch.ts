import {
  KlevuFetch,
  KlevuRecord,
  search,
  suggestions,
  trendingProducts,
} from "@klevu/core"
import { html, css, LitElement } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { cache } from "lit/directives/cache.js"
import "../product/product"
import "../suggestions/suggestions"
import {
  KlevuProduct,
  KlevuProductAnalyticsFunctionClick,
} from "../product/product"
import "../loadingindicator/loadingindicator"
import "../popularterms/popularterms"
import "../searchfield/searchfield"

namespace Events {
  export interface KlevuProductClick {
    record: KlevuRecord
  }
}

@customElement("klevu-quicksearch")
export class KlevuQuicksearch extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .container {
      position: relative;
    }
    .popup {
      position: absolute;
      visibility: hidden;
      box-sizing: border-box;
      bottom: 0;
      left: 0;
      box-shadow: 0px 10px 15px var(--klevu-color-shadow, rgba(0, 0, 0, 0.2));
      padding: var(--klevu-spacing-m);
      min-width: 960px;
      min-height: 300px;
      border-radius: var(--klevu-roundness);
      transition: opacity 0.4s, visibility 0.4s, transform 0.2s;
      opacity: 0;
      transform: translateY(100%);
      z-index: 1;
      background: white;
    }
    .popup.show {
      visibility: visible;
      opacity: 1;
      transform: translateY(calc(100% + 20px));
    }
    .popup .innercontainer {
      display: flex;
      align-items: stretch;
    }

    .popup .innercontainer .leftmenu {
      width: 160px;
    }

    .popup .products {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      gap: var(--klevu-spacing-m);
      width: 100%;
    }

    @keyframes showPopup {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `
  @property({ attribute: false }) renderProduct = (
    record: KlevuRecord,
    onclick: KlevuProductAnalyticsFunctionClick
  ) => {
    return html`<klevu-product
      .data="${record}"
      .klevuanalyticsclick=${onclick}
    ></klevu-product>`
  }

  @state() _trendingProducts: KlevuRecord[] = []
  @state() _results: KlevuRecord[] = []
  @state() _suggestions: string[] = []
  @state() _analyticsClick:
    | ((productId: string, variantId?: string) => void)
    | undefined = undefined
  @state() _showpopup = false
  @state() _loading = false

  private onInputFocus() {
    if (this._showpopup === true) {
      return
    }
    this._showpopup = true

    document.body.addEventListener("click", this.closePopup.bind(this))
  }

  private closePopup(event: Event) {
    if (
      event
        .composedPath()
        .some((e) => (e as HTMLElement).tagName === "KLEVU-QUICKSEARCH")
    ) {
      event.preventDefault()
      return false
    }
    this._showpopup = false
    document.body.removeEventListener("click", this.closePopup)
  }

  private onProductClick = (record: KlevuRecord, event: Event) => {
    if (this._analyticsClick) {
      this._analyticsClick(record.id, record.itemGroupId)
    }

    this.dispatchEvent(
      new CustomEvent<Events.KlevuProductClick>("klevu-product-click", {
        composed: true,
        detail: {
          record,
        },
      })
    )
    event.preventDefault()
    return false
  }

  private onKlevuSearch = async (event: CustomEvent) => {
    this._results = event.detail.results
    this._suggestions = event.detail.suggestions
    this._analyticsClick = event.detail.analyticalClick
    this._loading = false
  }

  async connectedCallback() {
    super.connectedCallback()

    const res = await KlevuFetch(
      trendingProducts({
        limit: 3,
      })
    )
    this._trendingProducts = res.queriesById("trendingProducts")?.records ?? []
  }

  render() {
    const popupClasses = { popup: true, show: this._showpopup }
    return html`
      <div class="container">
        <klevu-searchfield
          @focus=${this.onInputFocus}
          @klevu-start-search=${() => (this._loading = true)}
          @klevu-search-result=${this.onKlevuSearch}
          doSearch
        ></klevu-searchfield>
        <div class=${classMap(popupClasses)}>
          <div class="innercontainer">
            <div class="leftmenu">
              <klevu-suggestions
                .suggestions="${this._suggestions}"
              ></klevu-suggestions>
              <klevu-popularterms></klevu-popularterms>
            </div>
            <div class="products">
              ${cache(
                this._loading
                  ? html`<klevu-loadingindicator />`
                  : this._results.length === 0
                  ? html`${this._trendingProducts.map((r) =>
                      this.renderProduct(r, this.onProductClick)
                    )} `
                  : html`${this._results.map((r) =>
                      this.renderProduct(r, this.onProductClick)
                    )} `
              )}
            </div>
          </div>
        </div>
      </div>
    `
  }
}
