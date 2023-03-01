import { Component, h, Host, Prop } from "@stencil/core"

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

  render() {
    return (
      <Host>
        <klevu-typography class="caption" variant="h4">
          {this.caption}
        </klevu-typography>
        {this.suggestions?.map((s) => (
          <klevu-list condensed noXPadding>
            <span slot="primary" innerHTML={s}></span>
          </klevu-list>
        ))}
      </Host>
    )
  }
}
