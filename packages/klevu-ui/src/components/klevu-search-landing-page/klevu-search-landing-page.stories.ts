import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-search-landing-page.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Apps/SearchLandingPage",
  parameters: { notes },
}

export const Default = WebComponentTemplate<HTMLKlevuSearchLandingPageElement>({
  tag: "klevu-search-landing-page",
  args: {
    term: "shoes",
  },
})
