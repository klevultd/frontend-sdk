import { FilterManager } from "@klevu/core"
import { fullMockRequest, WebComponentTemplate } from "../../storybookUtils"

// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Components/FacetList",
  parameters: { notes },
}
export default meta

const manager = new FilterManager()
manager.initFromListFilters(fullMockRequest.queryResults?.[0].filters as any)

export const Default = WebComponentTemplate<HTMLKlevuFacetListElement>({
  tag: "klevu-facet-list",
  args: {
    manager,
  },
})

export const Radio = WebComponentTemplate<HTMLKlevuFacetListElement>({
  tag: "klevu-facet-list",
  args: {
    manager,
    mode: "radio",
  },
})

export const ModePerKey = WebComponentTemplate<HTMLKlevuFacetListElement>({
  tag: "klevu-facet-list",
  args: {
    manager,
    mode: {
      category: "radio",
      brand: "radio",
    },
  },
})
