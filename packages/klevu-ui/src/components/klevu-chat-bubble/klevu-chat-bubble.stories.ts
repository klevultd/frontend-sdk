import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuChatBubble } from "./klevu-chat-bubble"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-chat-bubble")

const meta: Meta = {
  title: "Atoms/Chat Bubble",
  component: "klevu-chat-bubble",
  argTypes,
  parameters,
}

export default meta

export const ChatBubble: StoryObj<KlevuChatBubble> = {
  args: {},
  render: (args) => html`
    <klevu-chat-layout>
      <klevu-chat-bubble remote=${ifDefined(args.remote)}
        >Hello world! This is a content for chat bubble!</klevu-chat-bubble
      >
      <klevu-chat-bubble remote>And this is where remote answers!</klevu-chat-bubble>
      <klevu-chat-bubble>Oh nice! I didn't know that we have responses in examples.</klevu-chat-bubble>
    </klevu-chat-layout>
  `,
}
