import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuDropdown } from "./klevu-dropdown"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-dropdown")

const meta: Meta = {
  title: "Atoms/Dropdown",
  component: "klevu-dropdown",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Dropdown: StoryObj<KlevuDropdown> = {
  args: {
    options: [
      {
        value: "1",
        text: "One",
      },
      {
        value: "2",
        text: "Two",
      },
      {
        value: "3",
        text: "Three",
      },
    ],
  },

  render: (args) => html`<klevu-dropdown
    .options=${args.options}
    disabled=${ifDefined(args.disabled)}
    name=${ifDefined(args.name)}
    selected=${ifDefined(args.selected)}
    variant=${ifDefined(args.variant)}
  >
  </klevu-dropdown>`,
}

export const StyledDropdown: StoryObj<KlevuDropdown> = {
  args: {
    options: [
      {
        value: "1",
        text: "One",
      },
      {
        value: "2",
        text: "Two",
      },
      {
        value: "3",
        text: "Three",
      },
    ],
  },

  render: (args) => html`
      <klevu-dropdown
      id="styledDropdown"
        .options=${args.options}
        disabled=${ifDefined(args.disabled)}
        name=${ifDefined(args.name)}
        selected=${ifDefined(args.selected)}
        variant=${ifDefined(args.variant)}
      >
      </klevu-dropdown>
    </div>
    <style id="styled">
      #styledDropdown::part(dropdown-select) {
        font-style: italic;
        background-color: aqua;
      }
    </style> `,
}
