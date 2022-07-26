import { KlevuFetch, KlevuRecord, search, suggestions } from "@klevu/core"
import { Component, Host, h, Prop, State, Event, EventEmitter } from "@stencil/core"
import { debounce } from "../../utils/utils"

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

  @Prop() limit = 10

  @Event({
    composed: true,
  })
  /**
   * When results come from after typing in the search field. This is debounced to avoid excessive requests.
   */
  searchResults: EventEmitter<KlevuRecord[]>

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

    const result = await KlevuFetch(suggestions(term), search(term, { limit: this.limit }))

    this.searchResults.emit(result.queriesById("search")?.records)
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
