import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-search-field.css"

export default {
  title: "Components/SearchField",
  layout: "centered",
  parameters: {
    actions: {
      argTypesRegex: "^on.*",
      handles: ["results"],
    },
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
