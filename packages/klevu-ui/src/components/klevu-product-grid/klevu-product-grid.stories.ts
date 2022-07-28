import { KlevuProductElement, products, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-product-grid.css"

const productElements = products.slice(0, 8).map((p) => KlevuProductElement(p))

export default {
  title: "Components/ProductGrid",
}

export const Grid = WebComponentTemplate<HTMLKlevuProductGridElement>({
  tag: "klevu-product-grid",
  args: {},
  childElements: productElements,
})
