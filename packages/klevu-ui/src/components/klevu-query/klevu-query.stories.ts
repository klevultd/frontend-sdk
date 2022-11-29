import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-query", {
  title: "Start/Query",
  parameters: { notes },
})

const Template: Story<HTMLKlevuQueryElement> = (args) =>
  html`<klevu-query
    .category=${args.category}
    .categoryTitle=${args.categoryTitle}
    .filterCount=${args.filterCount}
    .limit=${args.limit}
    .manager=${args.manager}
    .offset=${args.offset}
    .options=${args.options}
    .recommendationId=${args.recommendationId}
    .searchTerm=${args.searchTerm}
    .sort=${args.sort}
    .type=${args.type}
    .updateOnFilterChange=${args.updateOnFilterChange}
  ></klevu-query>`

export const Default = Template.bind({})
Default.args = {
  type: "search",
  searchTerm: "hoodies",
}
