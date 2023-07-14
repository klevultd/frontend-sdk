import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuUtilScrollbars } from "./klevu-util-scrollbars"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-util-scrollbars")

const meta: Meta = {
  title: "Utils/UtilScrollbars",
  component: "klevu-util-scrollbars",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const UtilScrollbars: StoryObj<KlevuUtilScrollbars> = {
  args: {
    overflowY: "scroll",
  },
  render: (args) => html`
    <div style="max-width: 400px">
      <p>This is a content without scrollbars that is followed by a content with scrollbars.</p>

      <klevu-util-scrollbars .overflowX=${args.overflowX} .overflowY=${args.overflowY}>
        <div style="display: block; height: 200px; width: 600px;">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sapien et gravida faucibus, eros erat
            maximus metus, nec maximus felis magna sed sem. Aliquam sodales nibh ex, imperdiet euismod velit egestas
            quis. Nulla at orci vel ipsum luctus tempus non efficitur turpis. Donec malesuada nisl non fermentum
            faucibus. Proin cursus, nisi sit amet auctor scelerisque, est erat pellentesque neque, sit amet blandit
            lacus enim vitae urna. Praesent feugiat sem vitae sagittis pharetra. Morbi non nisl lectus. Pellentesque in
            dolor quis nunc porta efficitur. Donec tincidunt lobortis malesuada. Nullam pretium orci non lorem mattis,
            nec ornare ligula venenatis.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sapien et gravida faucibus, eros erat
            maximus metus, nec maximus felis magna sed sem. Aliquam sodales nibh ex, imperdiet euismod velit egestas
            quis. Nulla at orci vel ipsum luctus tempus non efficitur turpis. Donec malesuada nisl non fermentum
            faucibus. Proin cursus, nisi sit amet auctor scelerisque, est erat pellentesque neque, sit amet blandit
            lacus enim vitae urna. Praesent feugiat sem vitae sagittis pharetra. Morbi non nisl lectus. Pellentesque in
            dolor quis nunc porta efficitur. Donec tincidunt lobortis malesuada. Nullam pretium orci non lorem mattis,
            nec ornare ligula venenatis.
          </p>
        </div>
      </klevu-util-scrollbars>
    </div>
  `,
}
