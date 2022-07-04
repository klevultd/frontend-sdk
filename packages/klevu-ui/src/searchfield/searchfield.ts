import {
  KlevuFetch,
  KlevuRecord,
  KlevuSuggestionResult,
  search,
  suggestions,
} from "@klevu/core"
import { html, css, LitElement } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { KlevuProductAnalyticsFunctionClick } from "../product/product"
import { debounce } from "../utils"

@customElement("klevu-searchfield")
export class KlevuQuicksearch extends LitElement {
  @property({ type: Boolean }) doSearch = false

  static styles = css`
    form {
      display: flex;
    }
    input[type="text"] {
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
  `
  @state() _searchDisabled = true

  private onInputFocus(event: FocusEvent) {
    this.dispatchEvent(new FocusEvent("focus"))
    event.preventDefault()
    event.stopPropagation()
    return false
  }

  private async onInputChange(event: KeyboardEvent) {
    const searchElement = event.target as HTMLInputElement
    this._searchDisabled = searchElement.value.length === 0
    this.emitInputChange(searchElement.value)
  }

  private emitInputChange = debounce((term: string) => {
    this.dispatchEvent(
      new CustomEvent("klevu-debounced-input-change", {
        detail: {
          term,
        },
      })
    )

    if (this.doSearch) {
      this.doKlevuSearch(term)
    }
  }, 300)

  private async doKlevuSearch(term: string) {
    if (term.length < 3) {
      return
    }

    this.dispatchEvent(
      new CustomEvent("klevu-start-search", {
        bubbles: true,
        composed: true,
      })
    )

    const result = await KlevuFetch(
      search(term, {
        limit: 3,
      }),
      suggestions(term)
    )
    const searchRes = result.queriesById("search")

    if (!searchRes) {
      return
    }

    const searchResults = searchRes.records ?? []
    const suggestionResults =
      result
        .suggestionsById("suggestions")
        ?.suggestions.map((s) => s.suggest) ?? []

    this.dispatchEvent(
      new CustomEvent<{
        results: KlevuRecord[]
        suggestions: typeof suggestionResults
        analyticalClick?: (productId: string, variantId?: string) => void
      }>("klevu-search-result", {
        bubbles: true,
        composed: true,
        detail: {
          results: searchResults,
          suggestions: suggestionResults,
          analyticalClick: searchRes.getSearchClickSendEvent?.(),
        },
      })
    )
  }

  private formsubmit(event: SubmitEvent) {
    const term =
      (this.shadowRoot?.getElementById("klevu-fetch-term") as HTMLInputElement)
        .value ?? ""

    this.dispatchEvent(
      new CustomEvent("search", {
        bubbles: true,
        composed: true,
        detail: {
          term,
        },
      })
    )

    event.preventDefault()
    return false
  }

  render() {
    return html`<form>
      <input
        class="klevu-fetch-term"
        id="klevu-fetch-term"
        type="text"
        name="klevu-fetch-term"
        placeholder="For example 'shoes under 40'"
        @keyup=${this.onInputChange}
        @focus=${this.onInputFocus}
        autocomplete="off"
      />
      <button
        type="submit"
        @click=${this.formsubmit}
        ?disabled=${this._searchDisabled}
      >
        Search
      </button>
    </form>`
  }
}
