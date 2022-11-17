import type { KlevuRecord } from "@klevu/core"
import { KlevuProductElement, mockProducts, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-product-grid.css"
// @ts-ignore
import notes from "./readme.md"

const productElements = mockProducts.slice(0, 8).map((p) => KlevuProductElement(p))

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Components/ProductGrid",
  parameters: { notes },
}
export default meta

export const Grid = WebComponentTemplate<HTMLKlevuProductGridElement>({
  tag: "klevu-product-grid",
  args: {},
  childElements: productElements,
})
