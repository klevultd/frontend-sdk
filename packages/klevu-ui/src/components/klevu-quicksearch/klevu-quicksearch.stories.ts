import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuQuicksearch } from "./klevu-quicksearch"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-quicksearch")

const meta: Meta = {
  title: "Apps/Quicksearch",
  component: "klevu-quicksearch",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Quicksearch: StoryObj<KlevuQuicksearch> = {
  args: {
    popupAnchor: "bottom-start",
    fallbackTerm: "shoes",
    searchCategories: true,
    searchCmsPages: true,
  },
  render: (args) => html`<klevu-quicksearch
    fallback-term=${ifDefined(args.fallbackTerm)}
    popup-anchor=${ifDefined(args.popupAnchor)}
    search-categories=${ifDefined(args.searchCategories)}
    search-cms-cages=${ifDefined(args.searchCmsPages)}
    placeholder=${ifDefined(args.placeholder)}
    search-field-variant=${ifDefined(args.searchFieldVariant)}
    t-search-result=${ifDefined(args.tSearchResults)}
    t-start-chat=${ifDefined(args.tStartChat)}
    t-categories-caption=${ifDefined(args.tCategoriesCaption)}
  ></klevu-quicksearch>`,
}
