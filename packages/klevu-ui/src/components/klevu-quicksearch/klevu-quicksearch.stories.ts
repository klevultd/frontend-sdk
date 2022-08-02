import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-quicksearch.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Components/Quicksearch",
  parameters: { notes },
}

export const Default = WebComponentTemplate<HTMLKlevuQuicksearchElement>({ tag: "klevu-quicksearch", args: {} })
