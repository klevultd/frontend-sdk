import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuPopularSearches } from "./klevu-popular-searches"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-popular-searches")

const meta: Meta = {
  title: "Atoms/Popular Searches",
  component: "klevu-popular-searches",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const PopularSearches: StoryObj<KlevuPopularSearches> = {
  render: (args) => html`<klevu-popular-searches t-caption=${ifDefined(args.tCaption)}></klevu-popular-searches>`,
}

export const StyledPopularSearches: StoryObj<KlevuPopularSearches> = {
  render: (args) => html`<klevu-popular-searches
      id="styledPopularSearch"
      t-caption=${ifDefined(args.tCaption)}
    ></klevu-popular-searches>
    <style>
      #styledPopularSearch::part(popular-searches-caption) {
        font-style: italic;
      }
      #styledPopularSearch::part(popular-searches-list-item) {
        color: red;
      }
    </style> `,
}
