import { css, fullMockRequest, html, mockProducts, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-product.css"
// @ts-ignore
import notes from "./readme.md"

const product = fullMockRequest.queryResults?.[0].records[0]
// const fullMockProducts = fullMockRequest.queryResults[0].records

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Components/Product",
  parameters: {
    notes,
    actions: {
      handles: ["klevuProductClick"],
    },
  },
}
export default meta

export const NormalProduct = WebComponentTemplate<HTMLKlevuProductElement>({ tag: "klevu-product", args: { product } })

export const ListProduct = WebComponentTemplate<HTMLKlevuProductElement>({
  tag: "klevu-product",
  args: { product, variant: "line" },
})

export const LoadingListProduct = WebComponentTemplate<HTMLKlevuProductElement>({
  tag: "klevu-product",
  args: { variant: "line" },
})

export const SmallProduct = WebComponentTemplate<HTMLKlevuProductElement>({
  tag: "klevu-product",
  args: { product, variant: "small" },
})

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

export const HideSwatches = WebComponentTemplate<HTMLKlevuProductElement>({
  tag: "klevu-product",
  args: { product, hideSwatches: true },
})

export const LoadingProduct = WebComponentTemplate<HTMLKlevuProductElement>({ tag: "klevu-product", args: {} })
