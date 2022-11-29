import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta, fullMockRequest } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-pagination", {
  title: "Components/Pagination",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuPaginationElement> = (args) =>
  html`<klevu-pagination
    .current=${args.current}
    .max=${args.max}
    .min=${args.min}
    .nextNext=${args.nextNext}
    .prevText=${args.prevText}
    .queryResult=${args.queryResult}
  ></klevu-pagination>`

export const Default = Template.bind({})
Default.args = {
  min: 1,
  max: 6,
  current: 3,
}

export const FromRequest = Template.bind({})
FromRequest.args = {
  queryResult: fullMockRequest.queryResults?.[0],
}
