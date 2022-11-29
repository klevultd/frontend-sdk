import { autofillMeta, KlevuProductElement, mockProducts } from "../../storybookUtils"

//
import notes from "./readme.md"

const productElements = mockProducts.slice(0, 8).map((p) =>
  KlevuProductElement(p, {
    fixedWidth: true,
  })
)

import { Story } from "@storybook/web-components"
import { html } from "lit-html"

export default autofillMeta("klevu-product-grid", {
  title: "Components/ProductGrid",
  parameters: { notes },
})

const Template: Story<HTMLKlevuProductGridElement> = (args) => html`<klevu-product-grid>
  ${productElements}
</klevu-product-grid>`

export const Grid = Template.bind({})
