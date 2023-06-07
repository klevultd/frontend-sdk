import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuProductQuery } from "./klevu-product-query"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-product-query")

const meta: Meta = {
  title: "Apps/Product Query",
  component: "klevu-product-query",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Query: StoryObj<KlevuProductQuery> = {
  args: {},
  render: (args) => html`<klevu-product-query></klevu-product-query>`,
}
