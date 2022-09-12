import {
  fallback,
  KlevuFetch,
  KlevuFetchQueryResult,
  KlevuRecord,
  KlevuTypeOfRecord,
  search,
  suggestions,
} from "@klevu/core"
import { Component, Host, h, Prop, State, Event, EventEmitter } from "@stencil/core"
import { debounce } from "../../utils/utils"

export type SearchResultsEventData = {
  fallback?: KlevuFetchQueryResult
  search?: KlevuFetchQueryResult
  category?: KlevuFetchQueryResult
  cms?: KlevuFetchQueryResult
}

export type SuggestionsEventData = string[]

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

  /**
   * Should try to find categories as well
   */
  @Prop() searchCategories?: boolean

  /**
   * Should try to find cms pages as well
   */
  @Prop() searchCmsPages?: boolean

  /**
   * When results come from after typing in the search field. This is debounced to avoid excessive requests.
   */
  @Event({
    composed: true,
  })
  klevuSearchResults: EventEmitter<SearchResultsEventData>

  @Event({ composed: true })
  klevuSearchSuggestions: EventEmitter<SuggestionsEventData>

  /**
   * When user clicks search button. Returns the search term.
   */
  @Event({
    composed: true,
  })
  klevuSearchClick: EventEmitter<string>

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

    const allSearchQueries = [
      search(term, { limit: this.limit, typeOfRecords: [KlevuTypeOfRecord.Product] }, ...searchModifiers),
    ]
    if (this.searchCmsPages) {
      allSearchQueries.push(
        search(term, { id: "cmsSearch", limit: this.limit, typeOfRecords: [KlevuTypeOfRecord.Cms] })
      )
    }
    if (this.searchCategories) {
      allSearchQueries.push(
        search(term, { id: "categorySearch", limit: this.limit, typeOfRecords: [KlevuTypeOfRecord.Category] })
      )
    }

    const result = await KlevuFetch(suggestions(term), ...allSearchQueries)

    this.klevuSearchResults.emit({
      fallback: result.queriesById("search-fallback"),
      search: result.queriesById("search"),
      category: result.queriesById("categorySearch"),
      cms: result.queriesById("cmsSearch"),
    })

    this.klevuSearchSuggestions.emit(result.suggestionsById("suggestions").suggestions.map((s) => s.suggest))
  }, 500)

  handleChange = (event: CustomEvent<string>) => {
    this.term = event.detail
    this.doSearch(event.detail)
  }

  handleSearchClick = (event) => {
    this.klevuSearchClick.emit(this.term)
  }

  render() {
    return (
      <Host>
        <klevu-textfield
          value={this.term}
          placeholder={this.placeholder}
          onKlevuTextChanged={this.handleChange.bind(this)}
        ></klevu-textfield>
        <klevu-button onClick={this.handleSearchClick.bind(this)}>Search</klevu-button>
      </Host>
    )
  }
}
