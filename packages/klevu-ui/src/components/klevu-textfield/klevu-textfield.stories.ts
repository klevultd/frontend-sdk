import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-textfield", {
  title: "Atoms/Textfield",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuTextfieldElement> = (args) =>
  html`<klevu-textfield
    .disabled=${args.disabled}
    .placeholder=${args.placeholder}
    .value=${args.value}
  ></klevu-textfield>`

export const Default = Template.bind({})
