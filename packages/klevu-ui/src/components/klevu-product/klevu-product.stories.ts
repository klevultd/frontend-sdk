import { MDXAutoFillMeta, fullMockRequest, mockProducts } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuProduct } from "./klevu-product"
import { KlevuRecord } from "@klevu/core"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-product")

const productItem = mockProducts[0]
const productItem2 = fullMockRequest.queryResults?.[0].records[1]
const productItem3 = fullMockRequest.queryResults?.[0].records[2]

const productRender = (args: KlevuProduct, className?: string) => html` <klevu-product
  class=${ifDefined(className)}
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
  show-add-to-cart=${ifDefined(args.showAddToCart)}
  t-add-to-cart=${ifDefined(args.tAddToCart)}
  hide-hover-image=${ifDefined(args.hideHoverImage)}
  vat-caption=${ifDefined(args.vatCaption)}
  show-variants-count=${ifDefined(args.showVariantsCount)}
></klevu-product>`

const meta: Meta = {
  title: "Components/Product",
  component: "klevu-product",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Product: StoryObj<KlevuProduct> = {
  args: {
    product: productItem,
    variant: "default",
  },
  render: (args) => html` ${productRender(args)} `,
}

export const SmallProduct: StoryObj<KlevuProduct> = {
  ...Product,
  args: {
    product: productItem,
    variant: "small",
  },
}

export const CustomizedProducts: StoryObj<KlevuProduct> = {
  args: {
    product: productItem,
    variant: "default",
  },
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
      klevu-product#modified::part(product-base) {
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

export const ProductWithoutImage: StoryObj<KlevuProduct> = {
  render: (args: KlevuProduct) => html`
    ${productRender(
      {
        variant: "default",
        product: {
          name: "Product without image",
          shortDesc: "This is a product that has no image. There should be no image placeholder.",
          price: "12345",
          currency: "JPY",
        } as Partial<KlevuRecord>,
      } as any,
      "without-image"
    )}
    <style>
      klevu-product.without-image::part(product-base) {
        border: 1px solid black;
      }
    </style>
  `,
}

export const StyledProduct: StoryObj<KlevuProduct> = {
  args: {
    product: productItem,
    variant: "default",
  },
  render: (args) => html`<klevu-product
      id="styledProduct"
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
      show-add-to-cart=${ifDefined(args.showAddToCart)}
      t-add-to-cart=${ifDefined(args.tAddToCart)}
      hide-hover-image=${ifDefined(args.hideHoverImage)}
      vat-caption=${ifDefined(args.vatCaption)}
      show-variants-count=${ifDefined(args.showVariantsCount)}
    ></klevu-product>
    <style>
      #styledProduct::part(product-base) {
        border: 1px solid black;
      }
      #styledProduct::part(product-brandname) {
        --klevu-typography-color: blue;
      }
      #styledProduct::part(product-name) {
        --klevu-typography-color: red;
        font-weight: bold; /* doesnt work*/
      }
      #styledProduct::part(product-description) {
        --klevu-typography-color: green;
      }
      #styledProduct::part(product-base) {
        border: 1px solid black;
      }
      #styledProduct::part(product-price) {
        --klevu-typography-color: darkorange;
      }
      #styledProduct::part(product-addtocart) {
        --klevu-button-background-color: yellow;
        --klevu-button-text-color: red;
      }
    </style>`,
}
