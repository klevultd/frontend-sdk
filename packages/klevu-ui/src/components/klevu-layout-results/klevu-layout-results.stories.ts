import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-layout-results", {
  title: "Layout/Results",
  parameters: { notes },
})

const Template: Story<HTMLKlevuLayoutResultsElement> = (args) =>
  html`<klevu-layout-results>
    <div slot="sidebar" style="background: lightblue; height: 500px;">Sidebar</div>
    <div slot="header" style="background: yellow; height: 100px;">Header</div>
    <div slot="content" style="background: green; height: 500px;">Content</div>
    <div slot="footer" style="background: red; height: 100px;">Footer</div>
  </kklevu-layout-results>`

export const Default = Template.bind({})
Default.args = {}
