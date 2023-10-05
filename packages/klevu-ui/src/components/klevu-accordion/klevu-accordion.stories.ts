import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuAccordion } from "./klevu-accordion"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-accordion")

const meta: Meta = {
  title: "Atoms/Accordion",
  component: "klevu-accordion",
  argTypes: {
    ...argTypes,
    startOpen: {
      table: {
        disable: true,
      },
    },
  },

  decorators,
}

export default meta

export const Accordion: StoryObj<KlevuAccordion> = {
  args: {
    startOpen: true,
  },
  render: (args) => html`
    <klevu-accordion open=${ifDefined(args.open)} start-open=${ifDefined(args.startOpen)}>
      <span slot="header">Heading</span>
      <div slot="content">
        The content of the accordion will be rendered in this section.
        <br />
        This is a long text to show in multilines
      </div>
    </klevu-accordion>
    <klevu-accordion open=${ifDefined(args.open)}>
      <span slot="header">Second heading</span>
      <div slot="content">
        The content of the accordion will be rendered in this section.
        <br />
        This is a long text to show in multilines
      </div>
    </klevu-accordion>
    <klevu-accordion open=${ifDefined(args.open)}>
      <span slot="header">Third heading</span>
      <div slot="content">
        The content of the accordion will be rendered in this section.
        <br />
        This is a long text to show in multilines
      </div>
    </klevu-accordion>
  `,
}

export const StyledAccordion: StoryObj<KlevuAccordion> = {
  args: {
    startOpen: true,
  },
  render: (args) => html`
    <klevu-accordion open=${ifDefined(args.open)} id="styledAccordion" startOpen=${ifDefined(args.startOpen)}>
      <span slot="header">Heading</span>
      <div slot="content">The content of the accordion will be rendered in this section.</div>
    </klevu-accordion>

    <style id="styled">
      #styledAccordion::part(accordion-header) {
        font-style: italic;
        background: rgba(#ccc, 0.3);
      }
      #styledAccordion::part(accordion-content) {
        font-size: 12px;
      }
      #styledAccordion::part(accordion-icon) {
        color: purple;
        font-size: 30px;
      }
    </style>
  `,
}
