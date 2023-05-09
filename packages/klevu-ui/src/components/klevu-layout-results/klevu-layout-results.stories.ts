import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuLayoutResults } from "./klevu-layout-results"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-layout-results")

const meta: Meta = {
  title: "Layout/Results",
  component: "klevu-layout-results",
  argTypes,
  parameters,
}

export default meta

export const Results: StoryObj<KlevuLayoutResults> = {
  render: (args) => html`<klevu-layout-results>
    <div slot="sidebar" style="background: lightblue; height: 500px;">Sidebar</div>
    <div slot="header" style="background: yellow; height: 100px; width: 100%;">Header</div>
    <div slot="content" style="background: green; height: 500px;">Content</div>
    <div slot="footer" style="background: red; height: 100px;">Footer</div>
  </klevu-layout-results>`,
}
