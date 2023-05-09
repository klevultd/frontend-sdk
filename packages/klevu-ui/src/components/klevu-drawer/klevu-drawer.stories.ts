import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuDrawer } from "./klevu-drawer"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-drawer")

const meta: Meta = {
  title: "Atoms/Drawer",
  component: "klevu-drawer",
  argTypes,
  parameters,
}

export default meta

export const Drawer: StoryObj<KlevuDrawer> = {
  args: {
    anchor: "left",
  },
  render: (args) => html`<klevu-drawer
    anchor=${ifDefined(args.anchor)}
    background=${ifDefined(args.background)}
    close-at-outside-click=${ifDefined(args.closeAtOutsideClick)}
    start-open=${ifDefined(args.startOpen)}
    insert-y-padding=${ifDefined(args.insertYPadding)}
  >
    <klevu-button slot="origin">Open drawer</klevu-button>
    <div slot="content">Hello world drawer</div>
  </klevu-drawer>`,
}
