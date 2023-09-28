import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"
import { stripTags } from "../../utils/utils"
import { partsExports } from "../../utils/partsExports"

/**
 * Simple component to list suggestions. Takes in a parameter suggestions that will be rendered as a list
 */
@Component({
  tag: "klevu-suggestions-list",
  styleUrl: "klevu-suggestions-list.css",
  shadow: true,
})
export class KlevuSuggestionsList {
  /**
   * Caption on the list
   */
  @Prop() caption = "Search suggestions"
  /**
   * Suggestions to render in list
   */
  @Prop() suggestions: string[] = []

  /**
   * Event that is emitted when a suggestion is clicked
   */
  @Event({
    composed: true,
  })
  klevuSuggestionClicked!: EventEmitter<string>

  #suggestionClick(suggestion: string) {
    this.klevuSuggestionClicked.emit(suggestion)
  }

  render() {
    if (this.suggestions.length === 0) return null

    return (
      <Host>
        <klevu-typography class="caption" variant="h3">
          {this.caption}
        </klevu-typography>
        {this.suggestions.map((s) => (
          <klevu-list condensed noXPadding exportparts={partsExports("klevu-list")}>
            <span slot="primary" innerHTML={s} onClick={() => this.#suggestionClick(stripTags(s))}></span>
          </klevu-list>
        ))}
      </Host>
    )
  }
}
