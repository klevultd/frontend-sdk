import { FilterManager, KlevuFilterType } from "@klevu/core"
import { fullMockRequest, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-facet.css"
// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Components/Facet",
  parameters: { notes },
}
export default meta

const manager = new FilterManager()
manager.initFromListFilters(fullMockRequest.queryResults?.[0].filters as any)

export const Default = WebComponentTemplate<HTMLKlevuFacetElement>({
  tag: "klevu-facet",
  args: {
    manager,
    option: manager.options[0],
    mode: "checkbox",
  },
})

export const DefaultRadio = WebComponentTemplate<HTMLKlevuFacetElement>({
  tag: "klevu-facet",
  args: {
    manager,
    option: manager.options[0],
    mode: "radio",
  },
})

export const CustomSort = WebComponentTemplate<HTMLKlevuFacetElement>({
  tag: "klevu-facet",
  args: {
    manager,
    option: manager.options[0],
    mode: "checkbox",
    customOrder: ["Aqua Blue/Orange", "All Black"],
  },
})

export const Slider = WebComponentTemplate<HTMLKlevuFacetElement>({
  tag: "klevu-facet",
  args: {
    manager,
    slider: {
      type: KlevuFilterType.Slider,
      min: "0",
      max: "0",
      start: "10",
      end: "90",
      key: "foo",
      label: "Ranger slider",
    },
  },
})
