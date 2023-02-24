import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
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
    error=${ifDefined(args.error)}
    variant=${ifDefined(args.variant)}
    icon=${ifDefined(args.icon)}
    clear-button=${ifDefined(args.clearButton)}
  ></klevu-textfield>`

export const Default = Template.bind({})
