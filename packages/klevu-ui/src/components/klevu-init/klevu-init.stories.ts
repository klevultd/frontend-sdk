import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuInit } from "./klevu-init"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-init")

const meta: Meta = {
  title: "Non components/Init",
  component: "klevu-facet-list",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Init: StoryObj<KlevuInit> = {
  args: {
    apiKey: "klevu-165829460115715456",
    url: "https://eucs30v2.ksearchnet.com/cs/v2/search",
    settings: {
      onItemClick: (product, event) => {
        return true
      },
      generateProductUrl: (product) => {
        return `myurl.com/${product.id}`
      },
      renderPrice: (amount, currency) => `${amount} ${currency}`,
    },
  },
  render: (args) => html`<klevu-init api-key=${args.apiKey} url=${args.url} .settings=${args.settings}></klevu-init>`,
}
