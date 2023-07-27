import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuLatestSearches } from "./klevu-latest-searches"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-latest-searches")

const meta: Meta = {
  title: "Components/Latest searches",
  component: "klevu-latest-searches",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const LatestSearches: StoryObj<KlevuLatestSearches> = {
  render: (args) => html`<klevu-latest-searches></klevu-latest-searches>`,
}
