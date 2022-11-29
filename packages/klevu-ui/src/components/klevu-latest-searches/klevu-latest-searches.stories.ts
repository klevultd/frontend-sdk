import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-latest-searches", {
  title: "Components/LatestSearches",
  parameters: { notes },
})

const Template: Story<HTMLKlevuLatestSearchesElement> = (args) => html`<klevu-latest-searches></klevu-latest-searches>`

export const Default = Template.bind({})
