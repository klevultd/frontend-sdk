import { MDXAutoFillMeta, mockProducts } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuChatLayout } from "./klevu-chat-layout"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-chat-bubble")
const productItem = mockProducts[0]

const meta: Meta = {
  title: "Layout/Chat",
  component: "klevu-chat-layout",
  argTypes,
  parameters,
}

export default meta

export const ChatLayout: StoryObj<KlevuChatLayout & { remote: boolean }> = {
  args: {
    showLoading: false,
  },
  render: (args) =>
    html`
      <klevu-chat-layout show-loading=${ifDefined(args.showLoading)}>
        <klevu-chat-bubble remote=${ifDefined(args.remote)}
          >Hello world! This is a content for chat bubble!</klevu-chat-bubble
        >
        <klevu-chat-bubble>A second chat bubble</klevu-chat-bubble>
        <klevu-chat-bubble
          >This is content that is really long to see how the bubbles react to that. I mean really long. It is several
          paragraphes to fill the space fully.</klevu-chat-bubble
        >
        <klevu-chat-bubble remote>And this is where remote answers!</klevu-chat-bubble>
        <klevu-slides style="--klevu-slides-item-width: 200px;">
          <klevu-product hide-swatches hide-brand .product=${productItem}>
            <div slot="bottom">
              <klevu-button full-width>Quick view</klevu-button>
              <klevu-button full-width>Show more like this</klevu-button>
            </div>
          </klevu-product>
          <klevu-product hide-swatches hide-brand .product=${productItem}>
            <div slot="bottom">
              <klevu-button full-width>Quick view</klevu-button>
              <klevu-button full-width>Show more like this</klevu-button>
            </div>
          </klevu-product>
          <klevu-product hide-swatches hide-brand .product=${productItem}>
            <div slot="bottom">
              <klevu-button full-width>Quick view</klevu-button>
              <klevu-button full-width>Show more like this</klevu-button>
            </div>
          </klevu-product>
          <klevu-product hide-swatches hide-brand .product=${productItem}>
            <div slot="bottom">
              <klevu-button full-width>Quick view</klevu-button>
              <klevu-button full-width>Show more like this</klevu-button>
            </div>
          </klevu-product>
          <klevu-product hide-swatches hide-brand .product=${productItem}>
            <div slot="bottom">
              <klevu-button full-width>Quick view</klevu-button>
              <klevu-button full-width>Show more like this</klevu-button>
            </div>
          </klevu-product>
          <klevu-product hide-swatches hide-brand .product=${productItem}>
            <div slot="bottom">
              <klevu-button full-width>Quick view</klevu-button>
              <klevu-button full-width>Show more like this</klevu-button>
            </div>
          </klevu-product>
          <klevu-product hide-swatches hide-brand .product=${productItem}>
            <div slot="bottom">
              <klevu-button full-width>Quick view</klevu-button>
              <klevu-button full-width>Show more like this</klevu-button>
            </div>
          </klevu-product>
          <klevu-product hide-swatches hide-brand .product=${productItem}>
            <div slot="bottom">
              <klevu-button full-width>Quick view</klevu-button>
              <klevu-button full-width>Show more like this</klevu-button>
            </div>
          </klevu-product>
          <klevu-product hide-swatches hide-brand .product=${productItem}>
            <div slot="bottom">
              <klevu-button full-width>Quick view</klevu-button>
              <klevu-button full-width>Show more like this</klevu-button>
            </div>
          </klevu-product>
          <klevu-product hide-swatches hide-brand .product=${productItem}>
            <div slot="bottom">
              <klevu-button full-width>Quick view</klevu-button>
              <klevu-button full-width>Show more like this</klevu-button>
            </div>
          </klevu-product>
        </klevu-slides>
        <klevu-chat-bubble>Oh nice! I didn't know that we have responses in examples.</klevu-chat-bubble>
        <klevu-chat-bubble remote
          >You can also make selections in this UI. Here are several options to select from:</klevu-chat-bubble
        >
        <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 8px 8px 16px;">
          <klevu-button is-secondary size="small">Option 1</klevu-button>
          <klevu-button is-secondary size="small">Option 2</klevu-button>
          <klevu-button is-secondary size="small">Option 3</klevu-button>
          <klevu-button is-secondary size="small">Option 4</klevu-button>
        </div>
        <div slot="menu">Hello menu!</div>
      </klevu-chat-layout>
    `,
}
