import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-button", {
  title: "Atoms/Button",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuButtonElement> = (args) =>
  html`<klevu-button .disabled=${args.disabled}>Hello Button</klevu-button>`

export const Default = Template.bind({})
