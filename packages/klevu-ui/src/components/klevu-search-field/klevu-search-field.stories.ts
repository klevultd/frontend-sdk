import { autofillMeta } from "../../storybookUtils"

//
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { html } from "lit-html"

export default autofillMeta("klevu-search-field", {
  title: "Components/SearchField",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuSearchFieldElement> = (args) =>
  html`<klevu-search-field
    .fallbackTerm=${args.fallbackTerm}
    .limit=${args.limit}
    .placeholder=${args.placeholder}
    .searchCategories=${args.searchCategories}
    .searchCmsPages=${args.searchCmsPages}
    .searchProducts=${args.searchProducts}
    .searchSuggestions=${args.searchSuggestions}
    .searchText=${args.searchText}
    .sendAnalytics=${args.sendAnalytics}
  ></klevu-search-field>`

export const Default = Template.bind({})
Default.args = {
  placeholder: "Custom placeholder",
  fallbackTerm: "jeans",
  searchProducts: true,
  searchSuggestions: true,
  searchCategories: false,
  searchCmsPages: false,
}
