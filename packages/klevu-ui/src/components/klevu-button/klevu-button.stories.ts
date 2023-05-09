import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-button")

const meta: Meta = {
  title: "Atoms/Button",
  component: "klevu-button",
  argTypes,
  parameters,
}

export default meta

export const Button: StoryObj<HTMLKlevuButtonElement & { text?: string }> = {
  args: {
    text: "Hello Button",
  },
  argTypes: {
    text: {
      description: "Text to be displayed on the button",
      control: {
        type: "text",
      },
    },
  },
  render: (args) => html` <klevu-button
    disabled=${ifDefined(args.disabled)}
    full-width=${ifDefined(args.fullWidth)}
    is-secondary=${ifDefined(args.isSecondary)}
    is-tertiary=${ifDefined(args.isTertiary)}
    icon=${ifDefined(args.icon)}
    >${args.text}</klevu-button
  >`,
}

export const IconButton1: StoryObj<HTMLKlevuButtonElement & { text?: string }> = {
  ...Button,
  args: {
    icon: "chevron_left",
  },
}

export const IconButton2: StoryObj<HTMLKlevuButtonElement & { text?: string }> = {
  ...Button,
  args: {
    icon: "search",
  },
}

export const IconButton3: StoryObj<HTMLKlevuButtonElement & { text?: string }> = {
  ...Button,
  args: {
    icon: "settings",
  },
}
