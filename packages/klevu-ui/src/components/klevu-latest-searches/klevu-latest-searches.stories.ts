import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-latest-searches.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Components/LatestSearches",
  parameters: { notes },
}

export const Default = WebComponentTemplate<HTMLKlevuLatestSearchesElement>({ tag: "klevu-latest-searches", args: {} })
