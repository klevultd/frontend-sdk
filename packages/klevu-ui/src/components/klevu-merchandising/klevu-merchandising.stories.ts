import { WebComponentTemplate } from "../../storybookUtils"

// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Apps/Merchandising",
  parameters: { notes },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuMerchandisingElement>({
  tag: "klevu-merchandising",
  args: {
    category: "Apparel",
    categoryTitle: "Apparels",
  },
})
