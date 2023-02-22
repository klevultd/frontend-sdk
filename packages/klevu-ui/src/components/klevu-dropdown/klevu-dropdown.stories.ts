import { autofillMeta } from "../../storybookUtils"

//
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"

export default autofillMeta("klevu-dropdown", {
  title: "Atoms/Dropdown",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuDropdownElement> = (args) =>
  html`<klevu-dropdown
    .options=${args.options as any}
    disabled=${ifDefined(args.disabled)}
    name=${ifDefined(args.name)}
    selected=${ifDefined(args.selected)}
    variant=${ifDefined(args.variant)}
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
