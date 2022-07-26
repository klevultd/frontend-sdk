import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-popular-searches.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Components/PopularSearches",
  parameters: { notes },
}

export const Default = WebComponentTemplate<HTMLKlevuPopularSearchesElement>({
  tag: "klevu-popular-searches",
  args: {},
})
