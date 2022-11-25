import { html } from "lit-html"

// @ts-ignore
import notes from "./readme.md"
import { autofillMeta } from "../../storybookUtils"
import { Story } from "@storybook/web-components"

export default autofillMeta("klevu-accordion", {
  title: "Atoms/Accordion",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuAccordionElement> = (args) => html` <klevu-accordion .startOpen=${args.startOpen}>
  <klevu-heading slot="header" variant="h2">Heading</klevu-heading>
  <div slot="content">Hello world accordion</div>
</klevu-accordion>`

export const Default: any = Template.bind({})

Default.args = {
  startOpen: true,
}
