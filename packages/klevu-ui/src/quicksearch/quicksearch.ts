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
import { debounce } from "../utils"
import "../product/product"
import "../suggestions/suggestions"
import {
  KlevuProduct,
  KlevuProductAnalyticsFunctionClick,
} from "../product/product"
import "../loadingindicator/loadingindicator"
import "../popularterms/popularterms"

@customElement("klevu-quicksearch")
export class KlevuQuicksearch extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .container {
      position: relative;
    }
    form {
      display: flex;
    }
    input {
      box-sizing: border-box;
      width: 100%;
      padding: var(--klevu-spacing-m);
      border-radius: var(--klevu-roundness);
      border: 1px solid var(--klevu-color-secondary);
    }
    button {
      margin-left: var(--klevu-spacing-m);
      background: var(--klevu-color-primary);
      border: none;
      appearance: unset;
      border-radius: var(--klevu-roundness);
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

  @property({ attribute: false }) onsearch = (term: string) => {}

  @state() _trendingProducts: KlevuRecord[] = []
  @state() _results: KlevuRecord[] = []
  @state() _suggestions: string[] = []
  @state() _analyticsClick:
    | ((productId: string, variantId?: string) => void)
    | undefined = undefined
  @state() _showpopup = false
  @state() _loading = false

  private async onInputChange(event: KeyboardEvent) {
    const searchElement = event.target as HTMLInputElement
    this.fetchFromKlevu(searchElement.value)
  }

  private onInputFocus() {
    console.log("show popup")
    this._showpopup = true

    document.body.addEventListener("click", this.closePopup.bind(this))
  }

  private closePopup(event: Event) {
    if (
      event
        .composedPath()
        .some((e) => (e as HTMLElement).tagName === "KLEVU-QUICKSEARCH")
    ) {
      return
    }
    this._showpopup = false
    document.body.removeEventListener("click", this.closePopup)
  }

  private onProductClick = (record: KlevuRecord, event: Event) => {
    if (this._analyticsClick) {
      this._analyticsClick(record.id, record.itemGroupId)
    }
    alert(`should redirect to "${record.url}"`)
    event.preventDefault()
    return false
  }

  private fetchFromKlevu = debounce(async (term: string) => {
    if (term.length < 3) {
      this._results = []
      this._suggestions = []
      return
    }

    this._loading = true
    const result = await KlevuFetch(
      search(term, {
        limit: 3,
      }),
      suggestions(term)
    )
    const searchRes = result.queriesById("search")
    if (searchRes) {
      this._results = searchRes.records ?? []
      if (searchRes.getSearchClickSendEvent) {
        this._analyticsClick = searchRes.getSearchClickSendEvent()
      }
    }
    this._suggestions =
      result
        .suggestionsById("suggestions")
        ?.suggestions.map((s) => s.suggest) ?? []
    this._loading = false
  }, 300)

  async connectedCallback() {
    super.connectedCallback()

    const res = await KlevuFetch(
      trendingProducts({
        limit: 3,
      })
    )
    this._trendingProducts = res.queriesById("trendingProducts")?.records ?? []
  }

  private formsubmit(event: SubmitEvent) {
    const termValue = (
      (event.target as HTMLElement).getElementsByClassName(
        "klevu-fetch-term"
      )[0] as HTMLInputElement
    ).value

    if (typeof termValue === "string" && termValue.length > 0) {
      this.onsearch(termValue)
    }

    event.preventDefault()
    return false
  }

  render() {
    const popupClasses = { popup: true, show: this._showpopup }
    return html`
      <div class="container">
        <form @submit=${this.formsubmit}>
          <input
            class="klevu-fetch-term"
            id="klevu-fetch-term"
            type="text"
            name="klevu-fetch-term"
            placeholder="For example 'shoes under 40'"
            @keyup="${this.onInputChange}"
            @focus=${this.onInputFocus}
            autocomplete="off"
          />
          <button type="submit">Search</button>
        </form>

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
