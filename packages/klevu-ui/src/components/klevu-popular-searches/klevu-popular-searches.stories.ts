import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuPopularSearches } from "./klevu-popular-searches"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-popular-searches")

const meta: Meta = {
  title: "Atoms/Popular Searches",
  component: "klevu-popular-searches",
  argTypes,
  parameters,
}

export default meta

export const PopularSearches: StoryObj<KlevuPopularSearches> = {
  render: (args) => html`<klevu-popular-searches caption=${ifDefined(args.caption)}></klevu-popular-searches>`,
}