import { KlevuRecord } from "@klevu/core"
import { css, html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"

@customElement("klevu-suggestions")
export class KlevuSuggestions extends LitElement {
  @property({
    attribute: false,
  })
  suggestions: string[] = []

  render() {
    if (this.suggestions.length === 0) {
      return null
    }
    return html` <div>
      <h4>Suggestions</h4>
      ${this.suggestions.map((s) => html`<div>${unsafeHTML(s)}</div>`)}
    </div>`
  }
}
