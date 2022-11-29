import { Component, h, Host, Prop } from "@stencil/core"

/**
 * Simple component to list suggestions
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
  @Prop() suggestions!: string[]

  render() {
    return (
      <Host>
        <klevu-heading variant="h2">{this.caption}</klevu-heading>
        <ul part="klevu-list">
          {this.suggestions?.map((s) => (
            <li innerHTML={s}></li>
          ))}
        </ul>
      </Host>
    )
  }
}
