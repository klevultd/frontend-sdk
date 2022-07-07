import { html } from "lit"
import "./product"

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: "Product",
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
    data: { type: "object" },
  },
}

const Template: any = (args: any) =>
  html`<klevu-product .data=${args.data}></klevu-product>`

export const First = Template.bind({})
First.args = {
  data: {
    id: "123",
    name: "Example Product",
    price: "399.99",
    currency: "EUR",
    image: "http://placeimg.com/300/500/people",
  },
}
