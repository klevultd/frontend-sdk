import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-sort", {
  title: "Components/Sort",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuSortElement> = (args) => html`<klevu-sort></klevu-sort>`

export const Default = Template.bind({})
