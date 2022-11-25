import { html, WebComponentTemplate } from "../../storybookUtils"

// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Components/Slider",
  parameters: {
    notes,
    actions: {
      handles: ["klevuSliderChange"],
    },
  },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuSliderElement>({
  tag: "klevu-slider",
  args: {
    min: 0,
    max: 100,
    start: 10,
    end: 90,
  },
})
