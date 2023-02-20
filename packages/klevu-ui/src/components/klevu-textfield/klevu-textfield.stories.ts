import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
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
    disabled=${ifDefined(args.disabled)}
    placeholder=${ifDefined(args.placeholder)}
    value=${ifDefined(args.value)}
  ></klevu-textfield>`

export const Default = Template.bind({})
