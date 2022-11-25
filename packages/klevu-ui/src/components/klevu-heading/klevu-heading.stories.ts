import { WebComponentTemplate } from "../../storybookUtils"

// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Atoms/Heading",
  parameters: { notes },
}
export default meta

export const H1 = WebComponentTemplate<HTMLKlevuHeadingElement>({
  tag: "klevu-heading",
  args: {
    variant: "h1",
  },
  innerHTML: "Heading 1",
})

export const H2 = WebComponentTemplate<HTMLKlevuHeadingElement>({
  tag: "klevu-heading",
  args: {
    variant: "h2",
  },
  innerHTML: "Heading 2",
})

export const H3 = WebComponentTemplate<HTMLKlevuHeadingElement>({
  tag: "klevu-heading",
  args: {
    variant: "h3",
  },
  innerHTML: "Heading 3",
})
