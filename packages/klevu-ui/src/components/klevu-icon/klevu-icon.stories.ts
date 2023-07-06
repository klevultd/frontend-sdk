import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuIcon } from "./klevu-icon"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-icon", undefined, {
  icons: {
    thumb_up: "https://resources-webcomponents.klevu.com/pqa/thumbs-up.svg",
    thumb_down: "https://resources-webcomponents.klevu.com/pqa/thumbs-down.svg",
  },
})

const meta: Meta = {
  title: "Atoms/Icon",
  component: "klevu-icon",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const icon: StoryObj<KlevuIcon> = {
  args: {
    name: "settings",
  },
  render: (args) => html`<klevu-icon name=${ifDefined(args.name)} />`,
}
