import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-latest-searches.css"
// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Components/LatestSearches",
  parameters: { notes },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuLatestSearchesElement>({ tag: "klevu-latest-searches", args: {} })
