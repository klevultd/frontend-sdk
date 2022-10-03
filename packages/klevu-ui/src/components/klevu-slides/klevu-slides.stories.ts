import type { KlevuRecord } from "@klevu/core"
import { KlevuProductElement, mockProducts, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-slides.css"
// @ts-ignore
import notes from "./readme.md"

const productElements = mockProducts.slice(0, 8).map((p) => KlevuProductElement(p, { variant: "small" }))

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Components/Slides",
  parameters: { notes },
}
export default meta

export const WithProducts = WebComponentTemplate<HTMLKlevuSlidesElement>({
  tag: "klevu-slides",
  args: {},
  childElements: productElements,
})
