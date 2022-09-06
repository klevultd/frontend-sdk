import { KlevuRecord } from "@klevu/core"
import { html, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-quicksearch.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Apps/Quicksearch",
  parameters: { notes },
}

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
      prod.addToCart = true
      return prod
    },
  },
})
