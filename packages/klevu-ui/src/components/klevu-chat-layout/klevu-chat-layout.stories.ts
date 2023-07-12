import { MDXAutoFillMeta, mockProducts } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuChatLayout } from "./klevu-chat-layout"
import { MoiMessages } from "@klevu/core"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-chat-bubble")
const productItem = mockProducts[0]

const meta: Meta = {
  title: "Layout/Chat",
  component: "klevu-chat-layout",
  argTypes,
  parameters,
  decorators,
}

const messages: MoiMessages = [
  {
    message: {
      id: "31029b1f-4309-4696-b7eb-70e113191ed1",
      type: "text",
      value: "I am your shopping assistant. How can I help you?",
      note: null,

      collectFeedback: false,
    },
  },
  {
    local: {
      message: "show filters",
    },
  },
  {
    message: {
      id: "669ca17c-7157-41f2-96c0-c0116f29d1bb",
      type: "text",
      value: "Sure, please see below.",
      note: null,

      collectFeedback: false,
    },
  },
  {
    message: {
      id: "669ca17c-7157-41f2-96c0-c0116f29d1bb",
      type: "text",
      value: "You must first select a productType",
      note: null,

      collectFeedback: false,
    },
  },
  {
    filter: {
      settings: {
        label: null,
        key: null,
        chatFormat: "$VALUE$",
        chatFormatEmpty: "I have something else to inquire for",
      },
      options: [
        {
          name: "dress",
          value: "klevu_subject:dress",
          selected: null,
          count: "1",
        },
        {
          name: "footwear",
          value: "klevu_subject:footwear",
          selected: null,
          count: "1",
        },
        {
          name: "gift",
          value: "klevu_subject:gift",
          selected: null,
          count: "1",
        },
        {
          name: "jewelry",
          value: "klevu_subject:jewelry",
          selected: null,
          count: "1",
        },
        {
          name: "shoes",
          value: "klevu_subject:shoes",
          selected: null,
          count: "1",
        },
        {
          name: "tops",
          value: "klevu_subject:tops",
          selected: null,
          count: "1",
        },
        {
          name: "sweater",
          value: "klevu_subject:sweater",
          selected: null,
          count: "1",
        },
        {
          name: "apron",
          value: "klevu_subject:apron",
          selected: null,
          count: "1",
        },
        {
          name: "backpack",
          value: "klevu_subject:backpack",
          selected: null,
          count: "1",
        },
        {
          name: "Show More",
          value: "klevu_subject:10",
          selected: null,
          count: "1",
        },
      ],
      note: "You can just select or write your choice in the message box",
    },
  },
  {
    local: {
      message: "dress",
    },
  },
  {
    filter: {
      settings: {
        label: "Please choose the brand you are interested in",
        key: "R-Brand",
        chatFormat: "$VALUE$ please!",
        chatFormatEmpty: "Any Brand would do!",
      },
      options: [
        {
          name: "roolee",
          value: "R-Brand:roolee",
          selected: false,
          count: "184",
        },
        {
          name: "salt",
          value: "R-Brand:salt",
          selected: false,
          count: "35",
        },
        {
          name: "rylee + cru",
          value: "R-Brand:rylee + cru",
          selected: false,
          count: "10",
        },
        {
          name: "free people",
          value: "R-Brand:free people",
          selected: false,
          count: "6",
        },
        {
          name: "Any",
          value: "R-Brand:klevu_any",
          selected: null,
          count: "1",
        },
      ],
      note: null,
    },
  },
]

export default meta

export const ChatLayout: StoryObj<KlevuChatLayout & { remote: boolean }> = {
  args: {
    showLoading: false,
  },
  render: (args) =>
    html`
      <klevu-chat-layout
        show-loading=${ifDefined(args.showLoading)}
        style="height: 500px; border: 1px solid black; overflow: hidden;"
      >
        <klevu-chat-messages .messages=${messages as any}></klevu-chat-messages>
        <div slot="menu">Hello menu!</div>
      </klevu-chat-layout>
    `,
}
