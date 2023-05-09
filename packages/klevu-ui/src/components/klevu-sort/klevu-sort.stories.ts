import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuSort } from "./klevu-sort"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-sort")

const meta: Meta = {
  title: "Components/Sort",
  component: "klevu-sort",
  argTypes,
  parameters,
}

export default meta

export const Sort: StoryObj<KlevuSort> = {
  args: {
    variant: "default",
  },

  render: (args) => html`<klevu-sort variant=${args.variant}></klevu-sort>`,
}
