import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuChatBubble } from "./klevu-chat-bubble"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-chat-bubble")

const meta: Meta = {
  title: "Atoms/Chat Bubble",
  component: "klevu-chat-bubble",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const ChatBubble: StoryObj<KlevuChatBubble> = {
  args: {},
  render: (args) => html`
    <klevu-chat-layout>
      <klevu-chat-bubble
        remote=${ifDefined(args.remote)}
        t-rating-reason=${ifDefined(args.tRatingReason)}
        .feedback=${args.feedback}
        .feedbackReasons=${args.feedbackReasons}
        >Hello world! This is a content for chat bubble!</klevu-chat-bubble
      >
      <klevu-chat-bubble remote>And this is where remote answers!</klevu-chat-bubble>
      <klevu-chat-bubble>Oh nice! I didn't know that we have responses in examples.</klevu-chat-bubble>
    </klevu-chat-layout>
  `,
}

export const StyledChatBubble: StoryObj<KlevuChatBubble> = {
  args: {
    feedback: { id: "1", thumbs: "up" },
    feedbackReasons: ["sampleReason"],
  },
  render: (args) => html`
    <klevu-chat-bubble
      id="styledChatBubble"
      remote=${ifDefined(args.remote)}
      t-rating-reason=${ifDefined(args.tRatingReason)}
      .feedback=${args.feedback}
      .feedbackReasons=${args.feedbackReasons}
      >Hello world! This is a content for chat bubble!</klevu-chat-bubble
    >
    <style>
      #styledChatBubble::part(chat-bubble-positive-feedback) {
        background-color: orange;
        color: white;
      }
      #styledChatBubble::part(chat-bubble-feedback-reasons) {
        --klevu-typography-color: blue;
        font-weight: bold;
      }
    </style>
  `,
}
