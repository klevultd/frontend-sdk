import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "klevu-suggestions-list",
  styleUrl: "klevu-suggestions-list.css",
  shadow: true,
})
export class KlevuSuggestionsList {
  @Prop() caption = "Search suggestions"
  @Prop() suggestions: string[]

  render() {
    return (
      <Host>
        <h3>{this.caption}</h3>
        <ul part="klevu-list">
          {this.suggestions?.map((s) => (
            <li innerHTML={s}></li>
          ))}
        </ul>
      </Host>
    )
  }
}
