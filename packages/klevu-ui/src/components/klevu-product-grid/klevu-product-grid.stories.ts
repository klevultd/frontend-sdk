import { MDXAutoFillMeta, KlevuProductElement, mockProducts } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuProductGrid } from "./klevu-product-grid"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-product-grid")

const productElements = () => mockProducts.slice(0, 8).map((p) => KlevuProductElement(p, { fixedWidth: true }))

const meta: Meta = {
  title: "Components/Product Grid",
  component: "klevu-product-grid",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const ProductGrid: StoryObj<KlevuProductGrid> = {
  render: (args) =>
    html`<klevu-product-grid items-per-row=${ifDefined(args.itemsPerRow)}>${productElements()}</klevu-product-grid>`,
}

export const ProductGridWithItemsPerRow: StoryObj<KlevuProductGrid> = {
  ...ProductGrid,
  args: {
    itemsPerRow: 6,
  },
}
