import { autofillMeta } from "../../storybookUtils"

//
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { html } from "lit-html"

export default autofillMeta("klevu-dropdown", {
  title: "Atoms/Dropdown",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuDropdownElement> = (args) =>
  html`<klevu-dropdown
    .options=${args.options as any}
    .disabled=${args.disabled}
    .name=${args.name}
    .selected=${args.selected}
  ></klevu-dropdown>`

export const Default = Template.bind({})
Default.args = {
  options: [
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
  ],
}
