import { KlevuProductElement, products, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-product-grid.css"
// @ts-ignore
import notes from "./readme.md"

const productElements = products.slice(0, 8).map((p) => KlevuProductElement(p))

export default {
  title: "Components/ProductGrid",
  parameters: { notes },
}

export const Grid = WebComponentTemplate<HTMLKlevuProductGridElement>({
  tag: "klevu-product-grid",
  args: {},
  childElements: productElements,
})
