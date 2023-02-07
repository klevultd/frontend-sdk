import {
  fallback,
  KlevuFetch,
  KlevuFetchFunctionReturnValue,
  KlevuFetchModifer,
  KlevuFetchQueryResult,
  KlevuTypeOfRecord,
  search,
  sendSearchEvent,
  suggestions,
} from "@klevu/core"
import { Component, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core"
import { debounce } from "../../utils/utils"
import { KlevuInit } from "../klevu-init/klevu-init"

export type SearchResultsEventData = {
  fallback?: KlevuFetchQueryResult
  search?: KlevuFetchQueryResult
  category?: KlevuFetchQueryResult
  cms?: KlevuFetchQueryResult
}

export type SuggestionsEventData = string[]

/**
 * Plain textfield that does the searching
 */
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
   * Button text
   */
  @Prop() searchText = "Search"

  /**
   * Maximum amount of results
   */
  @Prop() limit = 10

  /**
   * Fallback term to use if there are no results
   */
  @Prop() fallbackTerm?: string

  /**
   * Should search products
   */
  @Prop() searchProducts?: boolean

  /**
   * Should search suggestions
   */
  @Prop() searchSuggestions?: boolean

  /**
   * Should try to find categories as well
   */
  @Prop() searchCategories?: boolean

  /**
   * Should try to find cms pages as well
   */
  @Prop() searchCmsPages?: boolean

  /**
   * Sends analytics when making query
   */
  @Prop() sendAnalytics?: boolean

  /**
   * When results come from after typing in the search field. This is debounced to avoid excessive requests.
   */
  @Event({
    composed: true,
  })
  klevuSearchResults!: EventEmitter<SearchResultsEventData>

  /**
   * When searchfield gives some suggestions
   */
  @Event({ composed: true })
  klevuSearchSuggestions!: EventEmitter<SuggestionsEventData>

  /**
   * When user clicks search button. Returns the search term.
   */
  @Event({
    composed: true,
  })
  klevuSearchClick!: EventEmitter<string>

  async connectedCallback() {
    await KlevuInit.ready()
  }

  #doSearch = debounce(async (term: string) => {
    if (term.length < 3) {
      return
    }

    const searchModifiers: KlevuFetchModifer[] = []
    // if fallback term is defined use it to search
    if (this.fallbackTerm && this.searchProducts) {
      searchModifiers.push(
        fallback(
          search(this.fallbackTerm, {
            limit: this.limit,
          })
        )
      )
    }

    if (this.sendAnalytics) {
      searchModifiers.push(sendSearchEvent())
    }

    const allSearchQueries: KlevuFetchFunctionReturnValue[] = []
    if (this.searchProducts) {
      allSearchQueries.push(
        search(term, { limit: this.limit, typeOfRecords: [KlevuTypeOfRecord.Product] }, ...searchModifiers)
      )
    }
    if (this.searchCmsPages) {
      allSearchQueries.push(
        search(term, { id: "cmsSearch", limit: this.limit, typeOfRecords: [KlevuTypeOfRecord.Cms] }, ...searchModifiers)
      )
    }
    if (this.searchCategories) {
      allSearchQueries.push(
        search(
          term,
          { id: "categorySearch", limit: this.limit, typeOfRecords: [KlevuTypeOfRecord.Category] },
          ...searchModifiers
        )
      )
    }
    if (this.searchSuggestions) {
      allSearchQueries.push(suggestions(term))
    }

    if (allSearchQueries.length === 0) {
      throw new Error("You need specify at least one thing to search")
    }

    const result = await KlevuFetch(...allSearchQueries)

    this.klevuSearchResults.emit({
      fallback: result.queriesById("search-fallback"),
      search: result.queriesById("search"),
      category: result.queriesById("categorySearch"),
      cms: result.queriesById("cmsSearch"),
    })

    const suggestionsResult = result.suggestionsById("suggestions")

    if (suggestionsResult) {
      this.klevuSearchSuggestions.emit(suggestionsResult.suggestions.map((s) => s.suggest))
    }
  }, 500)

  #handleChange = (event: CustomEvent<string>) => {
    this.term = event.detail
    this.#doSearch(event.detail)
  }

  #handleSearchClick = () => {
    this.klevuSearchClick.emit(this.term)
  }

  render() {
    return (
      <Host>
        <klevu-textfield
          value={this.term}
          placeholder={this.placeholder}
          onKlevuTextChanged={this.#handleChange.bind(this)}
        ></klevu-textfield>
        <klevu-button onClick={this.#handleSearchClick.bind(this)}>{this.searchText}</klevu-button>
      </Host>
    )
  }
}
