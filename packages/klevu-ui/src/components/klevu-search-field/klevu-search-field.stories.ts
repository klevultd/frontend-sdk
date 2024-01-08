import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuSearchField } from "./klevu-search-field"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-search-field")
import { withActions } from "@storybook/addon-actions/decorator"

const meta: Meta = {
  title: "Components/SearchField",
  component: "klevu-search-field",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const SearchField: StoryObj<KlevuSearchField> = {
  args: {
    tPlaceholder: "Custom placeholder",
    fallbackTerm: "jeans",
    searchProducts: true,
    searchSuggestions: true,
    searchCategories: false,
    searchCmsPages: false,
  },
  render: (args) => html`<klevu-search-field
    fallback-term=${ifDefined(args.fallbackTerm)}
    limit=${ifDefined(args.limit)}
    t-placeholder=${args.tPlaceholder}
    t-search-text=${ifDefined(args.tSearchText)}
    search-categories=${ifDefined(args.searchCategories)}
    search-cms-pages=${ifDefined(args.searchCmsPages)}
    search-products=${ifDefined(args.searchProducts)}
    search-suggestions=${ifDefined(args.searchSuggestions)}
    send-analytics=${ifDefined(args.sendAnalytics)}
    variant=${ifDefined(args.variant)}
    term=${ifDefined(args.term)}
    use-loading-indicator=${ifDefined(args.useLoadingIndicator)}
  >
  </klevu-search-field>`,
}
