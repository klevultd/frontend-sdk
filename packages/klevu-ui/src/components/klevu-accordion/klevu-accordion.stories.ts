import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuAccordion } from "./klevu-accordion"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-accordion")

const meta: Meta = {
  title: "Atoms/Accordion",
  component: "klevu-accordion",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Accordion: StoryObj<KlevuAccordion> = {
  args: {
    startOpen: true,
  },
  render: (args) => html`
    <klevu-accordion startOpen=${ifDefined(args.startOpen)}>
      <span slot="header">Heading</span>
      <div slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod nunc vitae nisl aliquet, nec lacinia nisl
        aliquet. Sed euismod nunc vitae nisl aliquet, nec lacinia nisl aliquet. Sed euismod nunc vitae nisl aliquet, nec
        lacinia nisl aliquet.
      </div>
    </klevu-accordion>
    <klevu-accordion>
      <span slot="header">Second heading</span>
      <div slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod nunc vitae nisl aliquet, nec lacinia nisl
        aliquet. Sed euismod nunc vitae nisl aliquet, nec lacinia nisl aliquet. Sed euismod nunc vitae nisl aliquet, nec
        lacinia nisl aliquet.
      </div>
    </klevu-accordion>
    <klevu-accordion>
      <span slot="header">Third heading</span>
      <div slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod nunc vitae nisl aliquet, nec lacinia nisl
        aliquet. Sed euismod nunc vitae nisl aliquet, nec lacinia nisl aliquet. Sed euismod nunc vitae nisl aliquet, nec
        lacinia nisl aliquet.
      </div>
      <style>
        klevu-accordion::part(accordion-header) {
          color: red;
        }
        klevu-accordion::part(accordion-content) {
          color: green;
        }
        klevu-accordion::part(accordion-icon) {
          color: purple;
        }
      </style>
    </klevu-accordion>
  `,
}
