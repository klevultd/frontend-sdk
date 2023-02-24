import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"

//
import { Story } from "@storybook/web-components"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-accordion", {
  title: "Atoms/Accordion",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuAccordionElement> = (args) => html`<klevu-accordion
  startOpen=${ifDefined(args.startOpen)}
>
  <span slot="header">Heading</span>
  <div slot="content">Hello world accordion</div>
</klevu-accordion>`

export const Default: any = Template.bind({})

Default.args = {
  startOpen: true,
}
