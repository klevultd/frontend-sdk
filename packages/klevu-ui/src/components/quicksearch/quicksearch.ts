import { LitElement, css, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import debounce from "lodash.debounce"
import { KlevuFetch, search, suggestions } from "@klevu/core"
import type { KlevuRecord } from "@klevu/core"

@customElement("klevu-quick-search")
export class QuickSearch extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      position: relative;
    }

    input {
      width: 100%;
    }

    .popup {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 400px;
    }
    .popup_visible {
      display: block;
    }
  `

  showpopup = false
  trendingProducts: KlevuRecord[] = []
  searchResult: KlevuRecord[] = []
  suggestions: string[] = []

  @property({ type: String })
  searchValue = ""

  private keyPressHandler(event: KeyboardEvent) {
    if (event.key === "Enter") {
      // todo do the search
      return
    }
    const input = event.target as HTMLInputElement
    setTimeout(() => {
      this.searchValue = input.value
      this.debouncedSuggest(input.value)
    }, 0)
  }

  private debouncedSuggest = debounce((val: string) => {
    this.suggest(val)
  }, 300)

  private async suggest(input: string) {
    if (input.length < 3) {
      return
    }
    const result = await KlevuFetch(
      suggestions(this.searchValue),
      search(this.searchValue)
    )

    this.suggestions =
      result
        .suggestionsById("suggestions")
        ?.suggestions.map((s) => s.suggest) ?? []

    this.showpopup = true
  }

  render() {
    return html`<div>
      <div class="popup ${this.showpopup ? "popup_visible" : ""}">
        <h2>Suggestions</h2>
        <ul>
          ${this.suggestions.map((s) => html`<li>${s}</li>`)}
        </ul>
      </div>
      <input
        type="text"
        id="search"
        value="${this.searchValue}"
        placeholder="Search"
        @keypress="${this.keyPressHandler}"
      />
      <button>Search</button>
    </div>`
  }
}
