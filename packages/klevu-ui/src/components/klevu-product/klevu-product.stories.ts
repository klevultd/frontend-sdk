import { html } from "lit-html"
import { autofillMeta, fullMockRequest } from "../../storybookUtils"

//
import notes from "./readme.md"

const product = fullMockRequest.queryResults?.[0].records[0]

import { Story } from "@storybook/web-components"

export default autofillMeta("klevu-product", {
  title: "Components/Product",
  parameters: {
    notes,
  },
  args: {
    product,
  },
})

const Template: Story<HTMLKlevuProductElement> = (args) =>
  html`
    <klevu-product
      .product=${args.product}
      .variant=${args.variant}
      .fixedWidth=${args.fixedWidth}
      .hideBrand=${args.hideBrand}
      .hideDescription=${args.hideDescription}
      .hideImage=${args.hideImage}
      .hideName=${args.hideName}
      .hidePrice=${args.hideName}
      .hideSwatches=${args.hideSwatches}
    ></klevu-product>
  `

export const NormalProduct = Template.bind({})
export const ListProduct = Template.bind({})
ListProduct.args = {
  variant: "line",
}
export const LoadingProduct = Template.bind({})
LoadingProduct.args = {
  product: undefined,
}
