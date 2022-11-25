import { WebComponentTemplate } from "../../storybookUtils"

// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Components/CmsList",
  parameters: {
    notes,
    actions: {
      handles: ["klevuCmsPageClick"],
    },
  },
}
export default meta

export const Links = WebComponentTemplate<HTMLKlevuCmsListElement>({
  tag: "klevu-cms-list",
  args: {
    link: true,
    pages: [
      {
        name: "Google",
        url: "https://www.google.com",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com",
      },
    ],
  },
})

export const Events = WebComponentTemplate<HTMLKlevuCmsListElement>({
  tag: "klevu-cms-list",
  args: {
    link: false,
    pages: [
      {
        name: "Google",
        url: "https://www.google.com",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com",
      },
    ],
  },
})
