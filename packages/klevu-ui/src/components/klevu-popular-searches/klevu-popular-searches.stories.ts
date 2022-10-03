import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-popular-searches.css"
// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Components/PopularSearches",
  parameters: { notes },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuPopularSearchesElement>({
  tag: "klevu-popular-searches",
  args: {},
})
