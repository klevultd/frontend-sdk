import { KlevuRecord } from "@klevu/core"
import { html, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-quicksearch.css"
// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Apps/Quicksearch",
  parameters: { notes },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuQuicksearchElement>({
  tag: "klevu-quicksearch",
  args: {
    fallbackTerm: "shoes",
  },
})

export const WithCustomProduct = WebComponentTemplate<HTMLKlevuQuicksearchElement>({
  tag: "klevu-quicksearch",
  args: {
    fallbackTerm: "shoes",
    renderProduct: (product: KlevuRecord) => {
      const prod = document.createElement("klevu-product")
      prod.product = product
      prod.variant = "small"
      return prod
    },
  },
})
