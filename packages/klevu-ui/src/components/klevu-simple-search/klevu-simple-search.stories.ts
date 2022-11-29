import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-simple-search", {
  title: "Apps/SimpleSearch",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuSimpleSearchElement> = (args) => html`<klevu-simple-search></klevu-simple-search>`

export const Default = Template.bind({})
