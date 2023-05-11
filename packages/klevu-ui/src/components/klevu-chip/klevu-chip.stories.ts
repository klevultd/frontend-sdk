import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuChip } from "./klevu-chip"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-chip")

const meta: Meta = {
  title: "Atoms/Chip",
  component: "klevu-chip",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const chip: StoryObj<KlevuChip> = {
  render: (args) =>
    html`<klevu-chip selected=${ifDefined(args.selected)} removable=${ifDefined(args.removable)}>A chip</klevu-chip>`,
}
