import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-search-landing-page", {
  title: "Apps/SearchLandingPage",
  parameters: { notes },
})

const Template: Story<HTMLKlevuSearchLandingPageElement> = (args) =>
  html`<klevu-search-landing-page
    filter-count=${ifDefined(args.filterCount)}
    .filterCustomOrder=${args.filterCustomOrder}
    limit=${ifDefined(args.limit)}
    .renderProductSlot=${args.renderProductSlot}
    sort=${ifDefined(args.sort)}
    term=${ifDefined(args.term)}
    use-pagination=${ifDefined(args.usePagination)}
  ></klevu-search-landing-page>`

export const Default = Template.bind({})
Default.args = {
  term: "shoes",
}
