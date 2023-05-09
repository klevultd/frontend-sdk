import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuQuicksearch } from "./klevu-quicksearch"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-quicksearch")

const meta: Meta = {
  title: "Apps/Quicksearch",
  component: "klevu-quicksearch",
  argTypes,
  parameters,
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
  ></klevu-quicksearch>`,
}
