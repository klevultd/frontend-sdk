import { Meta, Story } from "@storybook/web-components"
import { html } from "lit-html"

export default {
  title: "Atoms/Forms",
  args: {
    disabled: false,
  },
} as Meta

export const InputWithCheckboxAndButton: Story = (args) => html`<div
  style="display: flex;
align-items: center;
justify-content: center;
gap: 16px;"
>
  <klevu-textfield .disabled=${args.disabled}></klevu-textfield>
  <klevu-checkbox .disabled=${args.disabled}></klevu-checkbox>
  <klevu-button .disabled=${args.disabled}>A Button</klevu-button>
  <klevu-dropdown
    .disabled=${args.disabled}
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
</div>`
