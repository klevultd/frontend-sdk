import {
  fallback,
  KlevuFetch,
  KlevuFetchFunctionReturnValue,
  KlevuFetchModifer,
  KlevuFetchQueryResult,
  KlevuSearchSorting,
  KlevuTypeOfRecord,
  search,
  sendSearchEvent,
  suggestions,
} from "@klevu/core"
import { Component, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from "@stencil/core"
import { debounce, globalExportedParts } from "../../utils/utils"
import { KlevuInit } from "../klevu-init/klevu-init"

export type SearchResultsEventData = {
  fallback?: KlevuFetchQueryResult
  search?: KlevuFetchQueryResult
  category?: KlevuFetchQueryResult
  cms?: KlevuFetchQueryResult
}

export type SuggestionsEventData = string[]
export type SearchFieldVariant = "default" | "pill"

/**
 * Plain textfield that does the searching. It queries Klevu and returns the results
 * in a custom event. Then you can decide what to do with the results.
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
   * In case you want to sort the results
   */
  @Prop() sort?: KlevuSearchSorting

  /**
   * Variant of the search field
   */
  @Prop() variant: SearchFieldVariant = "default"

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

  #lastQueryResult?: SearchResultsEventData

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
        search(
          term,
          { limit: this.limit, typeOfRecords: [KlevuTypeOfRecord.Product], sort: this.sort },
          ...searchModifiers
        )
      )
    }
    if (this.searchCmsPages) {
      allSearchQueries.push(
        search(
          term,
          { id: "cmsSearch", limit: this.limit, typeOfRecords: [KlevuTypeOfRecord.Cms], sort: this.sort },
          ...searchModifiers
        )
      )
    }
    if (this.searchCategories) {
      allSearchQueries.push(
        search(
          term,
          { id: "categorySearch", limit: this.limit, typeOfRecords: [KlevuTypeOfRecord.Category], sort: this.sort },
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

    console.log(allSearchQueries)

    const result = await KlevuFetch(...allSearchQueries)
    this.#lastQueryResult = {
      fallback: result.queriesById("search-fallback"),
      search: result.queriesById("search"),
      category: result.queriesById("categorySearch"),
      cms: result.queriesById("cmsSearch"),
    }
    this.klevuSearchResults.emit(this.#lastQueryResult)

    const suggestionsResult = result.suggestionsById("suggestions")

    if (suggestionsResult) {
      console.log(suggestionsResult.suggestions)
      this.klevuSearchSuggestions.emit(suggestionsResult.suggestions.map((s) => s.suggest))
    }
  }, 500)

  /**
   * Fetch next page of results from previous query
   *
   * @param type what type of content to get page from
   * @param pageIndex from what page. If empty next page is fetched
   */
  @Method()
  async getPage(type: "search" | "category" | "cms", pageIndex?: number) {
    if (!this.#lastQueryResult) {
      throw new Error("No search results to get page from")
    }

    switch (type) {
      case "search": {
        const res = this.#lastQueryResult.search
        if (res && res.getPage) {
          const result = await res.getPage({ pageIndex })
          this.#lastQueryResult.search = result.queriesById("search")
          this.klevuSearchResults.emit({
            search: result.queriesById("search"),
          })
        }
      }
      case "category": {
        const res = this.#lastQueryResult.category
        if (res && res.getPage) {
          const result = await res.getPage({ pageIndex })
          this.#lastQueryResult.category = result.queriesById("categorySearch")
          this.klevuSearchResults.emit({
            category: result.queriesById("categorySearch"),
          })
        }
      }
      case "cms": {
        const res = this.#lastQueryResult.cms
        if (res && res.getPage) {
          const result = await res.getPage({ pageIndex })
          this.#lastQueryResult.cms = result.queriesById("cmsSearch")
          this.klevuSearchResults.emit({
            cms: result.queriesById("cmsSearch"),
          })
        }
      }
    }
  }

  /**
   * Fetches query result from last request
   *
   * @param type type of query result
   * @returns
   */
  @Method()
  async getQueryResult(type: "search" | "category" | "cms") {
    if (!this.#lastQueryResult) {
      throw new Error("No search results to get query results")
    }

    return this.#lastQueryResult[type]
  }

  @Watch("sort")
  async propsChanged() {
    this.#doSearch(this.term)
  }

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
          onKlevuTextEnterPressed={this.#handleSearchClick.bind(this)}
          aria-role="search"
          variant={this.variant}
          icon="search"
          exportparts={globalExportedParts}
        ></klevu-textfield>
        {this.variant !== "pill" && (
          <klevu-button onClick={this.#handleSearchClick.bind(this)}>{this.searchText}</klevu-button>
        )}
      </Host>
    )
  }
}
