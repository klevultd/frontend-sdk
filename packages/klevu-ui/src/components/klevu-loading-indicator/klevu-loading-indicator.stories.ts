import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuLoadingIndicator } from "./klevu-loading-indicator"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-loading-indicator")

const meta: Meta = {
  title: "Atoms/Loading Indicator",
  component: "klevu-loading-indicator",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const LoadingIndicator: StoryObj<KlevuLoadingIndicator> = {
  render: () => html`<klevu-loading-indicator></klevu-loading-indicator>`,
}
