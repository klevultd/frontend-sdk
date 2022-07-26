import { FilterManager } from "@klevu/core"
import { fullMockRequest, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-facet-list.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Components/FacetList",
  parameters: { notes },
}

const manager = new FilterManager()
manager.initFromListFilters(fullMockRequest.queryResults[0].filters)

export const Default = WebComponentTemplate<HTMLKlevuFacetListElement>({
  tag: "klevu-facet-list",
  args: {
    manager,
  },
})
