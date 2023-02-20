import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"

export default autofillMeta("klevu-search-field", {
  title: "Components/SearchField",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuSearchFieldElement> = (args) =>
  html`<klevu-search-field
    fallback-term=${ifDefined(args.fallbackTerm)}
    limit=${ifDefined(args.limit)}
    placeholder=${args.placeholder}
    search-categories=${ifDefined(args.searchCategories)}
    search-cms-pages=${ifDefined(args.searchCmsPages)}
    search-products=${ifDefined(args.searchProducts)}
    search-suggestions=${ifDefined(args.searchSuggestions)}
    search-text=${ifDefined(args.searchText)}
    send-analytics=${ifDefined(args.sendAnalytics)}
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
