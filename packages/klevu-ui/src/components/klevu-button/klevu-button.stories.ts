import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuButton } from "./klevu-button"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-button")

const meta: Meta = {
  title: "Atoms/Button",
  component: "klevu-button",
  argTypes,
  parameters: {
    actions: {
      handles: ["click klevu-button"],
    },
  },
}

export default meta

export const Button: StoryObj<KlevuButton & { text?: string }> = {
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
    @click=${() => console.log("clicked")}
    size=${ifDefined(args.size)}
    >${args.text}</klevu-button
  >`,
}

export const IconButton1: StoryObj<KlevuButton & { text?: string }> = {
  ...Button,
  args: {
    icon: "chevron_left",
  },
}

export const IconButton2: StoryObj<KlevuButton & { text?: string }> = {
  ...Button,
  args: {
    icon: "search",
  },
}

export const IconButton3: StoryObj<KlevuButton & { text?: string }> = {
  ...Button,
  args: {
    icon: "settings",
  },
}
