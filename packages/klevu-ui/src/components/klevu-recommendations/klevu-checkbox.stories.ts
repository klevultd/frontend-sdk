import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuCheckbox } from "./klevu-checkbox"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-checkbox")

const meta: Meta = {
  title: "Atoms/Checkbox",
  component: "klevu-checkbox",
  argTypes,
  parameters,
}

export default meta

export const Checkbox: StoryObj<KlevuCheckbox & { text?: string }> = {
  args: {
    text: "Content related to checkbox",
  },
  argTypes: {
    text: {
      description: "Text to be displayed next to checkbox",
      control: {
        type: "text",
      },
    },
  },
  render: (args) => html`<klevu-checkbox
    checked=${ifDefined(args.checked)}
    disabled=${ifDefined(args.disabled)}
    name=${ifDefined(args.name)}
    >${ifDefined(args.text)}</klevu-checkbox
  >`,
}
