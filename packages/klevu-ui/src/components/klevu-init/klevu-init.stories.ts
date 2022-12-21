import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-init", {
  title: "Start/Init",
  parameters: { notes },
  args: {
    settings: {
      onProductClick: (product, event) => {},
      generateProductUrl: (product) => {
        return `myurl.com/${product.id}`
      },
      renderPrice: (amount, currency) => `${amount} ${currency}`,
    },
  },
})

const Template: Story<HTMLKlevuInitElement> = (args) => html`<klevu-init
  ><h3>Klevu-init</h3>
  <p>
    <em>klevu-init</em> is the most important component of the whole library. Place one in your document. It should be
    one of the first ones. Currently only one <em>klevu-init</em> per page is supported. It is used to define
    configuration for all components on the page and provide few global settings for all components:
  </p>
  <ul>
    <li style="padding: 10px 0">
      <strong>onItemClick:</strong> what happens when product is clicked. Typically this places default action of
      <em>klevu-product</em> click. For example you can make your own frontend router to act in this function. Is
      provided with product and click event as attributes. Remember to preventDefault and return false to prevent anchor
      link following.
    </li>
    <li style="padding: 10px 0">
      <strong>generateProductUrl:</strong> what kind of URL's should be generated for products. If
      <em>onItemClick</em> is not used this can be used for it. Has product as attribute.
    </li>
    <li style="padding: 10px 0">
      <strong>renderPrice:</strong> generic function for price rendering. If you wish to have your own formatting for
      price rendering then this is the place. Has two attribute amount and currency of item.
    </li>
  </ul>
</klevu-init>`

export const Default = Template.bind({})
