import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-facet.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Components/Facet",
  parameters: { notes },
}

export const Default = WebComponentTemplate<HTMLKlevuFacetElement>({ tag: "klevu-facet", args: {} })
