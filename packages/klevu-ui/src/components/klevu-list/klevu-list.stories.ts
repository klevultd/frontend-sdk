import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuList } from "./klevu-list"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-list")

const meta: Meta = {
  title: "Atoms/List",
  component: "klevu-list",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const List: StoryObj<KlevuList> = {
  args: {
    condensed: false,
    noXPadding: false,
  },
  render: (args) => html`
    <klevu-list condensed=${ifDefined(args.condensed)} no-x-padding=${ifDefined(args.noXPadding)}>
      <span slot="primary">List items with only primary text 1</span>
    </klevu-list>
    <klevu-list condensed=${ifDefined(args.condensed)} no-x-padding=${ifDefined(args.noXPadding)}>
      <span slot="primary">List items with only primary text 2</span>
    </klevu-list>
    <klevu-list condensed=${ifDefined(args.condensed)} no-x-padding=${ifDefined(args.noXPadding)}>
      <span slot="primary">List items with only primary text 3</span>
    </klevu-list>
    <klevu-list condensed=${ifDefined(args.condensed)} no-x-padding=${ifDefined(args.noXPadding)}>
      <span slot="primary">List items with only primary text 4</span>
    </klevu-list>
  `,
}

export const ListWithSecondaryText: StoryObj<KlevuList> = {
  render: (args) => html`
    <klevu-list>
      <span slot="primary">List items with primary text 1</span>
      <span slot="secondary">Secondary text on the list item 1</span>
    </klevu-list>
    <klevu-list>
      <span slot="primary">List items with primary text 2</span>
      <span slot="secondary">Secondary text on the list item 2</span>
    </klevu-list>
    <klevu-list>
      <span slot="primary">List items with primary text 3</span>
      <span slot="secondary">Secondary text on the list item 3</span>
    </klevu-list>
    <klevu-list>
      <span slot="primary">List items with primary text 4</span>
      <span slot="secondary">Secondary text on the list item 4</span>
    </klevu-list>
  `,
}

export const ListWithIcons: StoryObj<KlevuList> = {
  render: (args) => html` <klevu-list icon="check">
      <span slot="primary">List items with primary text 1</span>
      <span slot="secondary">Secondary text on the list item 1</span>
    </klevu-list>
    <klevu-list icon="search">
      <span slot="primary">List items with primary text 2</span>
      <span slot="secondary">Secondary text on the list item 2</span>
    </klevu-list>
    <klevu-list icon="palette">
      <span slot="primary">List items with only primary text 3</span>
    </klevu-list>
    <klevu-list icon="nature">
      <span slot="primary">List items with only primary text 4</span>
    </klevu-list>`,
}

export const ListWithImages: StoryObj<KlevuList> = {
  render: (args) => html`<klevu-list image="https://picsum.photos/200">
      <span slot="primary">List items with primary text 1</span>
      <span slot="secondary">Secondary text on the list item 1</span>
    </klevu-list>
    <klevu-list image="https://picsum.photos/300">
      <span slot="primary">List items with primary text 2</span>
      <span slot="secondary">Secondary text on the list item 2</span>
    </klevu-list>
    <klevu-list image="https://picsum.photos/220">
      <span slot="primary">List items with only primary text 3</span>
    </klevu-list>
    <klevu-list image="https://picsum.photos/400">
      <span slot="primary">List items with only primary text 4</span>
    </klevu-list>`,
}

export const ListWithUrl: StoryObj<KlevuList> = {
  render: (args) => html`<klevu-list image="https://picsum.photos/200" url="https://www.klevu.com">
      <span slot="primary">List items with primary text 1</span>
      <span slot="secondary">Secondary text on the list item 1</span>
    </klevu-list>
    <klevu-list image="https://picsum.photos/200" url="https://www.google.com">
      <span slot="primary">List items with primary text 2</span>
      <span slot="secondary">Secondary text on the list item 2</span>
    </klevu-list>`,
}

export const ListWithDefaultStyling: StoryObj<KlevuList> = {
  render: () => html`<klevu-list
      image="https://picsum.photos/200"
      primary-text="List items with primary text 1"
      secondary-text="Secondary text on the list item 1"
    >
    </klevu-list>
    <klevu-list
      image="https://picsum.photos/200"
      primary-text="List items with primary text 2"
      secondary-text="Secondary text on the list item 2"
    >
    </klevu-list>`,
}

export const StyledList: StoryObj<KlevuList> = {
  args: {
    condensed: false,
    noXPadding: false,
  },
  render: (args) => html`
    <klevu-list id="styledList" condensed=${ifDefined(args.condensed)} no-x-padding=${ifDefined(args.noXPadding)}>
      <span slot="primary">List items styled using parts</span>
    </klevu-list>
    <style id="styled">
      #styledList::part(list-content) {
        font-style: italic;
      }
    </style>
  `,
}
