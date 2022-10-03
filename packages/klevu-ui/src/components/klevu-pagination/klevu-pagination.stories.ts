import { fullMockRequest, WebComponentTemplate } from "../../storybookUtils"
import { Meta } from "@storybook/html"
import "./klevu-pagination.css"
// @ts-ignore
import notes from "./readme.md"

const meta: Meta = {
  title: "Components/Pagination",
  parameters: {
    notes,
    actions: {
      handles: ["klevuPaginationChange"],
    },
  },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuPaginationElement>({
  tag: "klevu-pagination",
  args: {
    min: 1,
    max: 6,
    current: 3,
  },
})

export const FromRequest = WebComponentTemplate<HTMLKlevuPaginationElement>({
  tag: "klevu-pagination",
  args: {
    queryResult: fullMockRequest.queryResults[0],
  },
})
