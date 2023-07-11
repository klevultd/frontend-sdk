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
  render: (args) => html` <klevu-chat-messages .messages=${[]}></klevu-chat-messages> `,
}
