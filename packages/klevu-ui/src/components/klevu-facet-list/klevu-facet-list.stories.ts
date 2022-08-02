import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-facet-list.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Components/FacetList",
  parameters: { notes },
}

export const Default = WebComponentTemplate<HTMLKlevuFacetListElement>({ tag: "klevu-facet-list", args: {} })
