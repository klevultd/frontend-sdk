import { autofillMeta, WebComponentTemplate } from "../../storybookUtils"
import { html } from "lit-html"

// @ts-ignore
import notes from "./readme.md"

import { Story } from "@storybook/web-components"

export default autofillMeta("klevu-checkbox", {
  title: "Atoms/Checkbox",
  parameters: { notes },
})

const Template: Story<HTMLKlevuCheckboxElement> = (args) =>
  html`<klevu-checkbox .checked=${args.checked} .disabled=${args.disabled} .name=${args.name}></klevu-checkbox>`
export const Default = Template.bind({})
Default.args = {
  checked: true,
}
