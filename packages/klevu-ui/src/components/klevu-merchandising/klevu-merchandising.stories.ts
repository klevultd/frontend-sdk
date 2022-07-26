import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-merchandising.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Apps/Merchandising",
  parameters: { notes },
}

export const Default = WebComponentTemplate<HTMLKlevuMerchandisingElement>({
  tag: "klevu-merchandising",
  args: {
    category: "Apparel",
    categoryTitle: "Apparels",
  },
})
