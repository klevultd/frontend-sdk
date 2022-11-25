import { html } from "lit-html"
// @ts-ignore
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { autofillMeta } from "../../storybookUtils"

export default autofillMeta("klevu-quicksearch", {
  title: "Apps/Quicksearch",
  parameters: { notes },
})

const Template: Story<HTMLKlevuQuicksearchElement> = (args) =>
  html` <klevu-quicksearch .fallbackTerm=${args.fallbackTerm}></klevu-quicksearch>`

export const Default = Template.bind({})

Default.args = {
  fallbackTerm: "shoes",
}
