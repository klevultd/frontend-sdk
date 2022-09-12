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
    searchCategories: false,
    searchCmsPages: false,
  },
})

const searchField = document.createElement("klevu-search-field")
const productGrid = document.createElement("klevu-product-grid")
searchField.addEventListener("klevuSearchResults", (event: any) => {
  productGrid.products = event.search?.records
})

export const WithResults = WebComponentTemplate({ tag: "div", args: {}, childElements: [searchField, productGrid] })

const suggestionsPopupSearchField = document.createElement("klevu-search-field")
suggestionsPopupSearchField.setAttribute("slot", "origin")

const suggestionsList = document.createElement("ul")
suggestionsList.setAttribute("slot", "content")
suggestionsList.setAttribute("part", "klevu-list")

const popup = document.createElement("klevu-popup")
popup.openAtFocus = false
popup.fullwidthContent = true
popup.appendChild(suggestionsPopupSearchField)
popup.appendChild(suggestionsList)
popup.addEventListener("klevuSearchSuggestions", (event: any) => {
  suggestionsList.innerHTML = ""
  event.detail.forEach((suggestion: string) => {
    const suggestionItem = document.createElement("li")
    suggestionItem.innerHTML = suggestion
    suggestionsList.appendChild(suggestionItem)
  })
  popup.open = true
})

export const SuggestionPopup = WebComponentTemplate<HTMLDivElement>({
  tag: "div",
  childElements: [popup],
})
