import { MDXAutoFillMeta, mockProducts } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuChatMessages } from "./klevu-chat-messages"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-chat-messages")

const meta: Meta = {
  title: "Components/ChatMessages",
  component: "klevu-chat-messages",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const ChatMessages: StoryObj<KlevuChatMessages & { remote: boolean }> = {
  args: {
    messages: [
      {
        message: {
          id: "1",
          note: "",
          type: "text",
          value: "Hi",
          collectFeedback: false,
        },
      },
      {
        local: {
          message: "hello",
        },
      },
      {
        message: {
          id: "2",
          note: "",
          type: "text",
          value: "This is a markdown message with [link to Klevu](https://www.klevu.com)",
        },
      },
    ],
  },
  render: (args) => html` <klevu-chat-messages .messages=${args.messages}></klevu-chat-messages> `,
}
