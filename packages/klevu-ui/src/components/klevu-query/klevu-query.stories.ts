import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-query", {
  title: "Start/Query",
  parameters: { notes },
})

const Template: Story<HTMLKlevuQueryElement> = (args) =>
  html`<klevu-query
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
    ></klevu-query>
    <p>
      <h3>Klevu Query</h3>
      <em>klevu-query</em> component is a special kind of component that makes queries to Klevu defined by the
      <em>type</em> parameter. It also listens to clicks to <em>klevu-product</em> -component and sends analytical data to Klevu
      based on that. This components gives you ability to create any kind of UI with Klevu components or by using your own
      components! Just use <em>klevu-query</em> to fetch the data and <em>klevu-product</em> to render the product
      cards. Whole content of <em>klevu-product</em> can be replaced with your content.
    </p>`

export const Default = Template.bind({})
Default.args = {
  type: "search",
  searchTerm: "hoodies",
}
