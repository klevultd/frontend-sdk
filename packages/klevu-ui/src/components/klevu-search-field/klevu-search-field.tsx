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

  @Prop() placeholder = "Search for products"

  @Event({
    composed: true,
  })
  results: EventEmitter<KlevuRecord[]>

  private doSearch = debounce(async (term: string) => {
    if (term.length < 3) {
      return
    }

    const result = await KlevuFetch(suggestions(term), search(term))

    this.results.emit(result.queriesById("search")?.records)
  }, 500)

  handleChange = (event) => {
    const searchElement = event.target as HTMLInputElement
    this.doSearch(searchElement.value)
  }

  render() {
    return (
      <Host>
        <input type="text" value={this.term} placeholder={this.placeholder} onInput={this.handleChange} />
        <input type="submit" value="Search" />
      </Host>
    )
  }
}
