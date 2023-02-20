import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"

export default autofillMeta("klevu-popular-searches", {
  title: "Components/PopularSearches",
  parameters: { notes },
})

const Template: Story<HTMLKlevuPopularSearchesElement> = (args) =>
  html`<klevu-popular-searches caption=${ifDefined(args.caption)}></klevu-popular-searches>`

export const Default = Template.bind({})
