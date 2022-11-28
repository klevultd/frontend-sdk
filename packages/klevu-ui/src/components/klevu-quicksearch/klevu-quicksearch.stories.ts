import { html } from "lit-html"
//
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { autofillMeta } from "../../storybookUtils"

export default autofillMeta("klevu-quicksearch", {
  title: "Apps/Quicksearch",
  parameters: { notes },
})

const Template: Story<HTMLKlevuQuicksearchElement> = (args) =>
  html` <klevu-init api-key="klevu-165829460115715456" url="https://eucs30v2.ksearchnet.com/cs/v2/search"
    ><klevu-quicksearch .fallbackTerm=${args.fallbackTerm}></klevu-quicksearch
  ></klevu-init>`

export const Default = Template.bind({})

Default.args = {
  fallbackTerm: "shoes",
}
