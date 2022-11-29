import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-heading", {
  title: "Atoms/Heading",
  parameters: { notes },
})

const Template: Story<HTMLKlevuHeadingElement> = (args) =>
  html`<klevu-heading .variant=${args.variant}>The quick brown fox jumps over the lazy dog</klevu-heading>`
export const H1 = Template.bind({})
H1.args = { variant: "h1" }
export const H2 = Template.bind({})
H2.args = { variant: "h2" }
export const H3 = Template.bind({})
H3.args = { variant: "h3" }
