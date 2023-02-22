import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-merchandising", {
  title: "Apps/Merchandising",
  parameters: { notes },
})

const Template: Story<HTMLKlevuMerchandisingElement> = (args) =>
  html`<klevu-merchandising
    category=${ifDefined(args.category)}
    category-title=${ifDefined(args.categoryTitle)}
    filter-count=${ifDefined(args.filterCount)}
    .filterCustomOrder=${args.filterCustomOrder}
    limit=${args.limit}
    .renderProductSlot=${args.renderProductSlot}
    sort=${ifDefined(args.sort)}
    use-pagination=${ifDefined(args.usePagination)}
  ></klevu-merchandising>`

export const Default = Template.bind({})
Default.args = {
  category: "Apparel",
  categoryTitle: "Apparels",
  limit: 24,
}

export const Pagination = Template.bind({})
Pagination.args = {
  usePagination: true,
  limit: 10,
}
