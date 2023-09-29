import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuBadge } from "./klevu-badge"
import { ifDefined } from "lit-html/directives/if-defined.js"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-badge")

const meta: Meta = {
  title: "Atoms/Badge",
  component: "klevu-badge",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Badges: StoryObj<KlevuBadge> = {
  args: {
    accent: 1,
  },
  render: (args) => html`
    <klevu-badge accent=${ifDefined(args.accent)}>Badge 1</klevu-badge>
    <klevu-badge accent="2">Badge 2</klevu-badge>
    <klevu-badge accent="3">Badge 3</klevu-badge>
    <klevu-badge accent="4" closable>Badge 4</klevu-badge>
  `,
}

export const NeutralBadges: StoryObj<KlevuBadge> = {
  render: (args) => html`
    <klevu-badge neutral="1">Badge 1</klevu-badge>
    <klevu-badge neutral="2">Badge 2</klevu-badge>
    <klevu-badge neutral="3">Badge 3</klevu-badge>
    <klevu-badge neutral="4" closable>Badge 4</klevu-badge>
  `,
}

export const CustomColor: StoryObj<KlevuBadge> = {
  render: (args) => html`<klevu-badge style="--klevu-badge-background: salmon;">Badge 1</klevu-badge>`,
}

export const StyledBadgeUsingParts: StoryObj<KlevuBadge> = {
  render: (args) => html`<klevu-badge id="badgeUsingParts" accent="2">Badge 1</klevu-badge>
    <style id="styled">
      #badgeUsingParts::part(badge-content) {
        font-size: 18px;
        font-style: italic;
      }
    </style>`,
}
