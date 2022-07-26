import { css, html, mockProducts, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-product.css"
// @ts-ignore
import notes from "./readme.md"

const product = mockProducts[0]

export default {
  title: "Components/Product",
  parameters: { notes },
}

export const NormalProduct = WebComponentTemplate<HTMLKlevuProductElement>({ tag: "klevu-product", args: { product } })

export const WithHeavyModifications = WebComponentTemplate<HTMLKlevuProductElement>({
  tag: "klevu-product",
  args: { product },
  innerHTML: html`<p slot="info">This replaces name</p>`,
  style: css`
    klevu-product::part(image) {
      border: 1px solid red;
    }
    klevu-product::part(image)::after {
      content: "";
      display: block;
      height: 30px;
      width: 30px;
      border: 1px solid blue;
    }
  `,
})

export const LoadingProduct = WebComponentTemplate<HTMLKlevuProductElement>({ tag: "klevu-product", args: {} })
