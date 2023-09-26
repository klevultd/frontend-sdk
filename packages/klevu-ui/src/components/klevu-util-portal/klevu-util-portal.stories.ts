import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuUtilPortal } from "./klevu-util-portal"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-util-portal")

const meta: Meta = {
  title: "Utils/Portal",
  component: "klevu-util-portal",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Portal: StoryObj<KlevuUtilPortal> = {
  render: (args) =>
    html` <klevu-util-portal>This content is portalled to end of <strong>&lt;body&gt;</strong>.</klevu-util-portal> `,
}
