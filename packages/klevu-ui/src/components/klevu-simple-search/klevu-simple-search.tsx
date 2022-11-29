import { Component, Event, EventEmitter, h, Host, State } from "@stencil/core"
import { KlevuSearchFieldCustomEvent } from "../../components"
import { SuggestionsEventData } from "../klevu-search-field/klevu-search-field"

/**
 * Simplified application that shows search box where typing text displays suggestions.
 */
@Component({
  tag: "klevu-simple-search",
  styleUrl: "klevu-simple-search.css",
  shadow: true,
})
export class KlevuSimpleSearch {
  popupElement?: HTMLKlevuPopupElement

  @State() suggestions: string[] = []

  /**
   * When any of suggestions has been clicked
   */
  @Event()
  klevuSuggestionClick!: EventEmitter<string>

  suggestionClick(suggestionWithHTML: string) {
    // strip HTML
    const tmp = document.createElement("div")
    tmp.innerHTML = suggestionWithHTML
    this.klevuSuggestionClick.emit(tmp.textContent || tmp.innerText)
    this.popupElement?.closeModal()
  }

  private onSuggestions(ev: KlevuSearchFieldCustomEvent<SuggestionsEventData>) {
    this.suggestions = ev.detail
    this.popupElement?.openModal()
  }

  render() {
    return (
      <Host>
        <klevu-popup fullwidthContent openAtFocus={false} ref={(el) => (this.popupElement = el)}>
          <klevu-search-field
            slot="origin"
            searchSuggestions
            onKlevuSearchSuggestions={this.onSuggestions.bind(this)}
          ></klevu-search-field>
          <div slot="content">
            <ul>
              {this.suggestions.map((s) => (
                <li onClick={() => this.suggestionClick(s)} innerHTML={s}></li>
              ))}
            </ul>
          </div>
        </klevu-popup>
      </Host>
    )
  }
}
