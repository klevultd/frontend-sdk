import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-search-landing-page", {
  title: "Apps/SearchLandingPage",
  parameters: { notes },
})

const Template: Story<HTMLKlevuSearchLandingPageElement> = (args) =>
  html`<klevu-search-landing-page
    .filterCount=${args.filterCount}
    .filterCustomOrder=${args.filterCustomOrder}
    .limit=${args.limit}
    .renderProductSlot=${args.renderProductSlot}
    .sort=${args.sort}
    .term=${args.term}
    .usePagination=${args.usePagination}
  ></klevu-search-landing-page>`

export const Default = Template.bind({})
Default.args = {
  term: "shoes",
}
