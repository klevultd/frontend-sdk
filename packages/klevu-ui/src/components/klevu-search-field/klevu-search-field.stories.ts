import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-search-field.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Components/SearchField",
  layout: "centered",
  parameters: {
    notes,
  },
}

export const Default = WebComponentTemplate<HTMLKlevuSearchFieldElement>({
  tag: "klevu-search-field",
  args: {
    placeholder: "Custom placeholder",
  },
})

const searchField = document.createElement("klevu-search-field")
const productGrid = document.createElement("klevu-product-grid")
searchField.addEventListener("results", (event: CustomEvent) => {
  productGrid.products = event.detail
})

export const WithResults = WebComponentTemplate({ tag: "div", args: {}, childElements: [searchField, productGrid] })
