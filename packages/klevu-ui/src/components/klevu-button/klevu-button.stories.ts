import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-button", {
  title: "Atoms/Button",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuButtonElement & { text: string }> = (args) =>
  html`<klevu-button
    disabled=${ifDefined(args.disabled)}
    full-width=${ifDefined(args.fullWidth)}
    is-secondary=${ifDefined(args.isSecondary)}
    >${args.text}</klevu-button
  >`

export const Default = Template.bind({})
Default.args = {
  text: "Hello Button",
}
