import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuDrawer } from "./klevu-drawer"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-drawer")

const meta: Meta = {
  title: "Atoms/Drawer",
  component: "klevu-drawer",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Drawer: StoryObj<KlevuDrawer> = {
  args: {
    anchor: "left",
    insertYPadding: true,
  },
  render: (args) => html`<klevu-drawer
    anchor=${ifDefined(args.anchor)}
    background=${ifDefined(args.background)}
    close-at-outside-click=${ifDefined(args.closeAtOutsideClick)}
    start-open=${ifDefined(args.startOpen)}
    insert-y-padding=${ifDefined(args.insertYPadding)}
  >
    <klevu-button slot="origin">Open drawer</klevu-button>
    <div slot="content">
      <h1>Hello world drawer</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sapien et gravida faucibus, eros erat
        maximus metus, nec maximus felis magna sed sem. Aliquam sodales nibh ex, imperdiet euismod velit egestas quis.
        Nulla at orci vel ipsum luctus tempus non efficitur turpis. Donec malesuada nisl non fermentum faucibus. Proin
        cursus, nisi sit amet auctor scelerisque, est erat pellentesque neque, sit amet blandit lacus enim vitae urna.
        Praesent feugiat sem vitae sagittis pharetra. Morbi non nisl lectus. Pellentesque in dolor quis nunc porta
        efficitur. Donec tincidunt lobortis malesuada. Nullam pretium orci non lorem mattis, nec ornare ligula
        venenatis.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sapien et gravida faucibus, eros erat
        maximus metus, nec maximus felis magna sed sem. Aliquam sodales nibh ex, imperdiet euismod velit egestas quis.
        Nulla at orci vel ipsum luctus tempus non efficitur turpis. Donec malesuada nisl non fermentum faucibus. Proin
        cursus, nisi sit amet auctor scelerisque, est erat pellentesque neque, sit amet blandit lacus enim vitae urna.
        Praesent feugiat sem vitae sagittis pharetra. Morbi non nisl lectus. Pellentesque in dolor quis nunc porta
        efficitur. Donec tincidunt lobortis malesuada. Nullam pretium orci non lorem mattis, nec ornare ligula
        venenatis.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sapien et gravida faucibus, eros erat
        maximus metus, nec maximus felis magna sed sem. Aliquam sodales nibh ex, imperdiet euismod velit egestas quis.
        Nulla at orci vel ipsum luctus tempus non efficitur turpis. Donec malesuada nisl non fermentum faucibus. Proin
        cursus, nisi sit amet auctor scelerisque, est erat pellentesque neque, sit amet blandit lacus enim vitae urna.
        Praesent feugiat sem vitae sagittis pharetra. Morbi non nisl lectus. Pellentesque in dolor quis nunc porta
        efficitur. Donec tincidunt lobortis malesuada. Nullam pretium orci non lorem mattis, nec ornare ligula
        venenatis.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sapien et gravida faucibus, eros erat
        maximus metus, nec maximus felis magna sed sem. Aliquam sodales nibh ex, imperdiet euismod velit egestas quis.
        Nulla at orci vel ipsum luctus tempus non efficitur turpis. Donec malesuada nisl non fermentum faucibus. Proin
        cursus, nisi sit amet auctor scelerisque, est erat pellentesque neque, sit amet blandit lacus enim vitae urna.
        Praesent feugiat sem vitae sagittis pharetra. Morbi non nisl lectus. Pellentesque in dolor quis nunc porta
        efficitur. Donec tincidunt lobortis malesuada. Nullam pretium orci non lorem mattis, nec ornare ligula
        venenatis.
      </p>
    </div>
  </klevu-drawer>`,
}
