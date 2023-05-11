import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuTab } from "./klevu-tab"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-tab")

const meta: Meta = {
  title: "Atoms/Tab",
  component: "klevu-tab",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Tab: StoryObj<KlevuTab & { text?: string }> = {
  args: {
    caption: "Tab",
  },
  render: (args) => html`<klevu-tab caption=${ifDefined(args.caption)}></klevu-tab
    ><klevu-tab caption=${ifDefined(args.caption)} active></klevu-tab
    ><klevu-tab caption=${ifDefined(args.caption)}></klevu-tab
    ><klevu-tab caption=${ifDefined(args.caption)}></klevu-tab>`,
}
