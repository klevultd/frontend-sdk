import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-search-field.css"
// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Components/SearchField",
  parameters: {
    notes,
    actions: {
      handles: ["klevuSearchResults", "klevuSearchClick", "klevuSearchSuggestions"],
    },
  },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuSearchFieldElement>({
  tag: "klevu-search-field",
  args: {
    placeholder: "Custom placeholder",
    fallbackTerm: "jeans",
    searchProducts: true,
    searchSuggestions: true,
    searchCategories: false,
    searchCmsPages: false,
  },
})

const searchField = document.createElement("klevu-search-field")
searchField.setAttribute("search-products", "")
searchField.setAttribute("search-suggestions", "")
const productGrid = document.createElement("klevu-product-grid")
searchField.addEventListener("klevuSearchResults", (event: any) => {
  for (const r of event.search.records) {
    const p = document.createElement("klevu-product")
    p.product = p
    productGrid.appendChild(p)
  }
})

export const WithResults = WebComponentTemplate({ tag: "div", args: {}, childElements: [searchField, productGrid] })

const suggestionsPopupSearchField = document.createElement("klevu-search-field")
suggestionsPopupSearchField.setAttribute("slot", "origin")
suggestionsPopupSearchField.setAttribute("search-suggestions", "")

const suggestionsList = document.createElement("klevu-suggestions-list")
suggestionsList.setAttribute("slot", "content")

const popup = document.createElement("klevu-popup")
popup.openAtFocus = false
popup.fullwidthContent = true
popup.appendChild(suggestionsPopupSearchField)
popup.appendChild(suggestionsList)
popup.addEventListener("klevuSearchSuggestions", (event: any) => {
  suggestionsList.suggestions = event.detail
  popup.openModal()
})

export const SuggestionPopup = WebComponentTemplate<HTMLDivElement>({
  tag: "div",
  childElements: [popup],
})
