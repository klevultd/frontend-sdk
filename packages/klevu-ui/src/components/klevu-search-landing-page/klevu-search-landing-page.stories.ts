import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuSearchLandingPage } from "./klevu-search-landing-page"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-search-landing-page")

const meta: Meta = {
  title: "Apps/Search Landing Page",
  component: "klevu-search-landing-page",
  argTypes,
  parameters,
}

export default meta

export const SearchLandingPage: StoryObj<KlevuSearchLandingPage> = {
  args: {
    term: "red shoes",
  },
  render: (args) => html`<klevu-search-landing-page
    filter-count=${ifDefined(args.filterCount)}
    .filterCustomOrder=${args.filterCustomOrder}
    limit=${ifDefined(args.limit)}
    .renderProductSlot=${args.renderProductSlot}
    sort=${ifDefined(args.sort)}
    term=${ifDefined(args.term)}
    use-pagination=${ifDefined(args.usePagination)}
  ></klevu-search-landing-page>`,
}
