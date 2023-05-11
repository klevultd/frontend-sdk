import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-lastest-searches")

const meta: Meta = {
  title: "Components/Latest searches",
  component: "klevu-latest-searches",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const LatestSearches: StoryObj = {
  render: (args) => html`<klevu-latest-searches></klevu-latest-searches>`,
}
