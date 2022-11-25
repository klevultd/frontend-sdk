import { WebComponentTemplate } from "../../storybookUtils"

// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Apps/SearchLandingPage",
  parameters: { notes },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuSearchLandingPageElement>({
  tag: "klevu-search-landing-page",
  args: {
    term: "shoes",
  },
})
