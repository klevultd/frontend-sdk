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

const Template: Story<HTMLKlevuInitElement> = (args) => html`<klevu-init>Your application</klevu-init>`

export const Default = Template.bind({})
