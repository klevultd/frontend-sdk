import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuProductQuery } from "./klevu-product-query"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-product-query")

const decoratorsWithoutInit = [decorators[0]]

const meta: Meta = {
  title: "Apps/Product Query",
  component: "klevu-product-query",
  argTypes,
  parameters,
  decorators: decoratorsWithoutInit,
}

export default meta

const productRender = (args: KlevuProductQuery) => {
  return html`
    <klevu-product-query
      pqa-widget-id=${ifDefined(args.pqaWidgetId)}
      url=${ifDefined(args.url)}
      product-id=${ifDefined(args.productId)}
      text-field-variant=${ifDefined(args.textFieldVariant)}
      text-field-placeholder=${ifDefined(args.textFieldPlaceholder)}
      popup-title=${ifDefined(args.popupTitle)}
      button-text=${ifDefined(args.buttonText)}
      ask-button-text=${ifDefined(args.askButtonText)}
      use-background=${ifDefined(args.useBackground)}
      fine-print=${ifDefined(args.finePrint)}
      popup-anchor=${ifDefined(args.popupAnchor)}
      popup-offset=${ifDefined(args.popupOffset)}
    ></klevu-product-query>
  `
}

export const Query: StoryObj<KlevuProductQuery> = {
  args: {
    url: "https://www.conns.com/lg-65-c2-evo-oled-tv-oled65c2pua.html",
  },
  render: (args) =>
    html`
      <klevu-init
        .settings=${{
          icons: {
            thumb_up: "https://resources-webcomponents.klevu.com/pqa/thumbs-up.svg",
            thumb_down: "https://resources-webcomponents.klevu.com/pqa/thumbs-down.svg",
          },
        }}
        api-key="klevu-164677714116414855"
        >${productRender(args)}</klevu-init
      >
    `,
}

export const QueryWithProductId: StoryObj<KlevuProductQuery> = {
  args: {
    productId: "40912128737373",
  },
  render: Query.render,
}

export const QueryWithWidgetId: StoryObj<KlevuProductQuery> = {
  args: {
    pqaWidgetId: "pqa-f53fb4ac-9b8b-48c6-be1f-e3131e841114",
    url: "https://klevu-trustpilot-demo.myshopify.com/products/grand-vcm-205-ltr-hairline-silver",
  },
  render: (args) =>
    html`<klevu-init
      .settings=${{
        icons: {
          thumb_up: "https://resources-webcomponents.klevu.com/pqa/thumbs-up.svg",
          thumb_down: "https://resources-webcomponents.klevu.com/pqa/thumbs-down.svg",
        },
      }}
      >${productRender(args)}</klevu-init
    >`,
}
