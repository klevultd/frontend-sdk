import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuTextfield } from "./klevu-textfield"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-textfield")

const meta: Meta = {
  title: "Atoms/Textfield",
  component: "klevu-textfield",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Textfield: StoryObj<KlevuTextfield> = {
  render: (args) => html`<klevu-textfield
    disabled=${ifDefined(args.disabled)}
    placeholder=${ifDefined(args.placeholder)}
    value=${ifDefined(args.value)}
    error=${ifDefined(args.error)}
    variant=${ifDefined(args.variant)}
    icon=${ifDefined(args.icon)}
    clear-button=${ifDefined(args.clearButton)}
  ></klevu-textfield>`,
}

export const FormFields: StoryObj<KlevuTextfield> = {
  render: (args) => html`<div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
    <klevu-textfield disabled=${args.disabled}></klevu-textfield>
    <klevu-checkbox disabled=${args.disabled}></klevu-checkbox>
    <klevu-button disabled=${args.disabled}>A Button</klevu-button>
    <klevu-dropdown
      disabled=${args.disabled}
      .options=${[
        {
          value: "1",
          text: "One",
        },
        {
          value: "2",
          text: "Two",
        },
        {
          value: "3",
          text: "Three",
        },
      ]}
    ></klevu-dropdown>
  </div>`,
}
