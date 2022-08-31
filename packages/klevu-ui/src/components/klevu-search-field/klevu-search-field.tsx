import { fallback, KlevuFetch, KlevuRecord, search, suggestions } from "@klevu/core"
import { Component, Host, h, Prop, State, Event, EventEmitter } from "@stencil/core"
import { debounce } from "../../utils/utils"

export type SearchResultsEvent = {
  isFallback?: boolean
  records: KlevuRecord[]
}

@Component({
  tag: "klevu-search-field",
  styleUrl: "klevu-search-field.css",
  shadow: true,
})
export class KlevuSearchField {
  @State() term = ""

  /**
   * The placeholder text to display in the search field.
   */
  @Prop() placeholder = "Search for products"

  /**
   * Maximum amount of results
   */
  @Prop() limit = 10

  /**
   * Fallback term to use if there are no results
   */
  @Prop() fallbackTerm?

  @Event({
    composed: true,
  })
  /**
   * When results come from after typing in the search field. This is debounced to avoid excessive requests.
   */
  searchResults: EventEmitter<SearchResultsEvent>

  @Event({ composed: true })
  searchSuggestions: EventEmitter<string[]>

  @Event({
    composed: true,
  })
  /**
   * When user clicks search button. Returns the search term.
   */
  searchClick: EventEmitter<string>

  private doSearch = debounce(async (term: string) => {
    if (term.length < 3) {
      return
    }

    const searchModifiers = []
    // if fallback term is defined use it to search
    if (this.fallbackTerm) {
      searchModifiers.push(
        fallback(
          search(this.fallbackTerm, {
            limit: this.limit,
          })
        )
      )
    }

    const result = await KlevuFetch(suggestions(term), search(term, { limit: this.limit }, ...searchModifiers))

    const fallbackResult = result.queriesById("search-fallback")
    if (fallbackResult) {
      this.searchResults.emit({
        isFallback: true,
        records: fallbackResult.records,
      })
    } else {
      this.searchResults.emit({
        records: result.queriesById("search")?.records,
      })
    }

    this.searchSuggestions.emit(result.suggestionsById("suggestions").suggestions.map((s) => s.suggest))
  }, 500)

  handleChange = (event: CustomEvent<string>) => {
    this.term = event.detail
    this.doSearch(event.detail)
  }

  handleSearchClick = (event) => {
    this.searchClick.emit(this.term)
  }

  render() {
    return (
      <Host>
        <klevu-textfield
          value={this.term}
          placeholder={this.placeholder}
          onTextChanged={this.handleChange.bind(this)}
        ></klevu-textfield>
        <klevu-button onClick={this.handleSearchClick.bind(this)}>Search</klevu-button>
      </Host>
    )
  }
}
