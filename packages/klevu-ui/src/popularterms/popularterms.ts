import { KlevuKMCSettings, KMCRootObject } from "@klevu/core"
import { css, html, LitElement, supportsAdoptingStyleSheets } from "lit"
import { customElement, state } from "lit/decorators.js"

@customElement("klevu-popularterms")
export class KlevuPopularTerms extends LitElement {
  @state() _kmcRootSettings?: KMCRootObject

  async connectedCallback() {
    super.connectedCallback()

    const settings = await KlevuKMCSettings()
    this._kmcRootSettings = settings.root
  }

  render() {
    return html`<h4>Popular terms</h4>
      <ul>
        ${(this._kmcRootSettings?.klevu_webstorePopularTerms ?? []).map(
          (term) => html`<li>${term}</li>`
        )}
      </ul>`
  }
}
