import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuChip } from "./klevu-chip"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-chip")

const meta: Meta = {
  title: "Atoms/Chip",
  component: "klevu-chip",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Chip: StoryObj<KlevuChip> = {
  args: {
    selected: true,
  },
  render: (args) =>
    html`
      <div class="chiplist">
        <klevu-chip selected=${ifDefined(args.selected)} removable=${ifDefined(args.removable)}>A chip</klevu-chip>
      </div>
      <script>
        // should be const, but documentation breaks if set
        chips = document.querySelectorAll(".chiplist klevu-chip")
        for (const chip of chips) {
          chip.addEventListener("click", (event) => {
            for (const chip of chips) {
              chip.setAttribute("selected", false)
            }
            event.target.setAttribute("selected", true)
          })

          chip.addEventListener("klevuChipRemove", (e) => {
            e.target.remove()
            // this prevents click events from being propagated in click event
            e.preventDefault()
            return false
          })
        }
      </script>
      <style>
        .chiplist {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chiplist klevu-chip {
          cursor: pointer;
        }
      </style>
    `,
}

export const StyledChip: StoryObj<KlevuChip> = {
  args: {
    selected: true,
    removable: true,
  },
  render: (args) =>
    html`
      <klevu-chip id="styledChip" selected=${ifDefined(args.selected)} removable=${ifDefined(args.removable)}
        >A chip</klevu-chip
      >

      <style id="styled">
        #styledChip::part(chip-icon) {
          color: var(--klevu-chip-selected-background, rgba(var(--klevu-color-primary-rgb), 0.9));
          font-size: 16px;
        }
        #styledChip::part(chip-content) {
          --klevu-typography-color: darkorange;
        }
      </style>
    `,
}
