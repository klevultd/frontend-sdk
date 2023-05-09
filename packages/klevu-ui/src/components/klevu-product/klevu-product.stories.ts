import { MDXAutoFillMeta, fullMockRequest, mockProducts } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuProduct } from "./klevu-product"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-product")

const productItem = mockProducts[0]
const productItem2 = fullMockRequest.queryResults?.[0].records[1]
const productItem3 = fullMockRequest.queryResults?.[0].records[2]

export const ProductItems = { productItem, productItem2, productItem3 }

const productRender = (args: KlevuProduct) => html` <klevu-product
  style="--klevu-product-width: 300px"
  variant=${args.variant}
  .product=${args.product}
  fixed-width=${ifDefined(args.fixedWidth)}
  hide-brand=${ifDefined(args.hideBrand)}
  hide-description=${ifDefined(args.hideDescription)}
  hide-image=${ifDefined(args.hideImage)}
  hide-price=${ifDefined(args.hidePrice)}
  hide-name=${ifDefined(args.hideName)}
  hide-swatches=${ifDefined(args.hideSwatches)}
  key-brand=${ifDefined(args.keyBrand)}
  key-name=${ifDefined(args.keyName)}
  key-description=${ifDefined(args.keyDescription)}
></klevu-product>`

const meta: Meta = {
  title: "Components/Product",
  component: "klevu-product",
  argTypes,
  parameters,
}

export default meta

export const Product: StoryObj<KlevuProduct> = {
  args: {
    product: productItem,
    variant: "default",
  },
  render: productRender,
}

export const SmallProduct: StoryObj<KlevuProduct> = {
  ...Product,
  args: {
    product: productItem,
    variant: "small",
  },
}

export const CustomizedProducts: StoryObj<KlevuProduct> = {
  render: (args: KlevuProduct) => html`<div>
    <klevu-product
      style="--klevu-product-width: 300px; --klevu-product-image-aspect-ratio: 1 / 1.3"
      variant=${args.variant}
      .product=${args.product}
      fixed-width=${ifDefined(args.fixedWidth)}
      hide-brand=${ifDefined(args.hideBrand)}
      hide-description=${ifDefined(args.hideDescription)}
      hide-image=${ifDefined(args.hideImage)}
      hide-price=${ifDefined(args.hidePrice)}
      hide-name=${ifDefined(args.hideName)}
      hide-swatches=${ifDefined(args.hideSwatches)}
      key-brand=${ifDefined(args.keyBrand)}
      key-name=${ifDefined(args.keyName)}
      key-description=${ifDefined(args.keyDescription)}
    ></klevu-product>
    <klevu-product
      id="modified"
      variant=${args.variant}
      .product=${args.product}
      fixed-width=${ifDefined(args.fixedWidth)}
      hide-brand=${ifDefined(args.hideBrand)}
      hide-description=${ifDefined(args.hideDescription)}
      hide-image=${ifDefined(args.hideImage)}
      hide-price=${ifDefined(args.hidePrice)}
      hide-name=${ifDefined(args.hideName)}
      hide-swatches=${ifDefined(args.hideSwatches)}
      key-brand=${ifDefined(args.keyBrand)}
      key-name=${ifDefined(args.keyName)}
      key-description=${ifDefined(args.keyDescription)}
    ></klevu-product>
    <style>
      #modified {
        --klevu-product-width: 300px;
      }
      klevu-product#modified::part(product-container) {
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.35);
      }
    </style>
  </div>`,
}

export const LineItems: StoryObj<KlevuProduct> = {
  render: (args: KlevuProduct) => html`
    ${productRender({ product: productItem, variant: "line" } as any)}
    ${productRender({ product: productItem2, variant: "line" } as any)}
    ${productRender({ product: productItem3, variant: "line" } as any)}
  `,
}