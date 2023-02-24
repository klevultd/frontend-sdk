import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-cms-list", {
  title: "Components/CmsList",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuCmsListElement> = (args) =>
  html`<klevu-cms-list
    link=${ifDefined(args.link)}
    .pages=${args.pages}
    caption=${ifDefined(args.caption)}
  ></klevu-cms-list>`

export const Links = Template.bind({})
Links.args = {
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
}

export const Events = Template.bind({})
Events.args = {
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
}
