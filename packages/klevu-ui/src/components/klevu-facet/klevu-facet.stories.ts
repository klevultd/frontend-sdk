import { FilterManager } from "@klevu/core"
import { fullMockRequest, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-facet.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Components/Facet",
  parameters: { notes },
}

const manager = new FilterManager()
manager.initFromListFilters(fullMockRequest.queryResults[0].filters)

export const Default = WebComponentTemplate<HTMLKlevuFacetElement>({
  tag: "klevu-facet",
  args: {
    manager,
    option: manager.options[0],
  },
})
