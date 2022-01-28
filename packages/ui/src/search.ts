import { LitElement, html, css } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { debounce } from "lodash-es"
import {
  KlevuFetch,
  search,
  KlevuRecord,
  suggestions,
  KlevuTypeOfRecord,
} from "@klevu/core"
import "./common/product"

@customElement("klevu-search")
export class KlevuSearch extends LitElement {
  static styles = css`
    :host {
      position: relative;
    }

    .popup {
      position: absolute;
      top: 100%;
      left: 0;
      display: none;
    }
    .popup.visible {
      display: block;
    }
  `

  @property()
  placeholder = "Search"

  @state()
  private searchResults: {
    products?: KlevuRecord[]
    pages?: KlevuRecord[]
    suggestions?: string[]
  } = {}
  @state()
  private showPopup = false

  protected render() {
    return html`
      <input type="text" @keyup="${this.searchChange}" />
      <div class="popup ${this.showPopup ? "visible" : undefined}">
        <nav>
          <h3>Suggestions</h3>
          <ul>
            ${this.searchResults.suggestions?.map(
              (s) => html`<li @click=${() => this.search(s)}>${s}</li>`
            )}
          </ul>
        </nav>
        <section>
          ${this.searchResults.products?.map(
            (p) => html`<klevu-product .product=${p}></klevu-product>`
          )}
        </section>
      </div>
    `
  }

  private searchChange(event: any) {
    if (event.target.value.length > 3) {
      this.debouncedSearch(event.target.value)
    }
  }

  /**
   *  Do the actual search
   *
   * @param term search term
   */
  private search = async (term: string) => {
    const result = await KlevuFetch(
      search(term, {
        typeOfRecords: [KlevuTypeOfRecord.Product],
        limit: 3,
      }),
      search(term, {
        id: "cmssearch",
        typeOfRecords: [KlevuTypeOfRecord.Cms],
        limit: 3,
      }),
      suggestions(term)
    )
    const products = result.queryResults?.search.records
    const pages = result.queryResults?.cmssearch.records
    const suggs = result.suggestionResults?.suggestions.suggestions.map(
      (s) => s.suggest
    )
    this.searchResults = {
      products,
      pages,
      suggestions: suggs,
    }
    this.showPopup = true
  }

  /**
   * Reduce amount of request by debounced typing
   */
  private debouncedSearch = debounce(this.search, 150)
}

declare global {
  interface HTMLElementTagNameMap {
    "klevu-search": KlevuSearch
  }
}
