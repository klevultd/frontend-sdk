import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuQuery } from "./klevu-query"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-query")

const meta: Meta = {
  title: "Non components/Query",
  component: "klevu-query",
  argTypes,
  parameters,
}

export default meta

export const Query: StoryObj<KlevuQuery> = {
  args: {
    type: "search",
    searchTerm: "hoodies",
  },
  render: (args) => html`<klevu-query
    category=${ifDefined(args.category)}
    category-title=${ifDefined(args.categoryTitle)}
    filter-count=${ifDefined(args.filterCount)}
    limit=${ifDefined(args.limit)}
    .manager=${args.manager}
    offset=${ifDefined(args.offset)}
    .options=${args.options}
    recommendation-id=${ifDefined(args.recommendationId)}
    search-term=${ifDefined(args.searchTerm)}
    sort=${ifDefined(args.sort)}
    type=${ifDefined(args.type)}
    update-on-filter-change=${ifDefined(args.updateOnFilterChange)}
  ></klevu-query>`,
}
