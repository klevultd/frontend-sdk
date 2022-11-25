import { Component, h, Host, Prop } from "@stencil/core"

@Component({
  tag: "klevu-suggestions-list",
  styleUrl: "klevu-suggestions-list.css",
  shadow: true,
})
export class KlevuSuggestionsList {
  @Prop() caption = "Search suggestions"
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
