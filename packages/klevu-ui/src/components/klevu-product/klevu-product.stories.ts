import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import { autofillMeta, fullMockRequest } from "../../storybookUtils"
import notes from "./readme.md"
import { Story } from "@storybook/web-components"

const product = fullMockRequest.queryResults?.[0].records[0]

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
      variant=${ifDefined(args.variant)}
      fixed-width=${ifDefined(args.fixedWidth)}
      hide-brand=${ifDefined(args.hideBrand)}
      hide-description=${ifDefined(args.hideDescription)}
      hide-image=${ifDefined(args.hideImage)}
      hide-name=${ifDefined(args.hideName)}
      hide-price=${ifDefined(args.hideName)}
      hide-swatches=${ifDefined(args.hideSwatches)}
    ></klevu-product>
  `

export const NormalProduct = Template.bind({})
NormalProduct.args = {
  variant: "default",
}
export const ListProduct = Template.bind({})
ListProduct.args = {
  variant: "line",
}
export const LoadingProduct = Template.bind({})
LoadingProduct.args = {
  product: undefined,
}
