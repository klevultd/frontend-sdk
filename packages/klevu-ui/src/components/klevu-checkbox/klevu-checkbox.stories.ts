import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"
import { Story } from "@storybook/web-components"

export default autofillMeta("klevu-checkbox", {
  title: "Atoms/Checkbox",
  parameters: { notes },
})

const Template: Story<HTMLKlevuCheckboxElement> = (args) =>
  html`<klevu-checkbox
    checked=${ifDefined(args.checked)}
    disabled=${ifDefined(args.disabled)}
    name=${ifDefined(args.name)}
  ></klevu-checkbox>`
export const Default = Template.bind({})
Default.args = {
  checked: true,
}
