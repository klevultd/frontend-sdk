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

export const StyledLoadingIndicator: StoryObj<KlevuLoadingIndicator> = {
  render: () => html`<klevu-loading-indicator id="styledLoadingIndicator"></klevu-loading-indicator></div>
    <style>
      #styledLoadingIndicator::part(loading-indicator-base)::before,
      #styledLoadingIndicator::part(loading-indicator-base),
      #styledLoadingIndicator::part(loading-indicator-base)::after {
        color: red;
        background-color: red;
      }
    </style> `,
}
