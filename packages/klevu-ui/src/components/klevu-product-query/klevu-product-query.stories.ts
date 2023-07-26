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

const chatRender = (args: KlevuProductQuery) => {
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
      settings=${ifDefined(JSON.stringify(args.settings))}
    ></klevu-product-query>
  `
}

export const Query: StoryObj<KlevuProductQuery> = {
  args: {
    url: "https://www.conns.com/lg-65-c2-evo-oled-tv-oled65c2pua.html",
  },
  render: (args) =>
    html`
      <div style="transform: translateY(-1px)">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sapien et gravida faucibus, eros erat
          maximus metus, nec maximus felis magna sed sem. Aliquam sodales nibh ex, imperdiet euismod velit egestas quis.
          Nulla at orci vel ipsum luctus tempus non efficitur turpis. Donec malesuada nisl non fermentum faucibus. Proin
          cursus, nisi sit amet auctor scelerisque, est erat pellentesque neque, sit amet blandit lacus enim vitae urna.
          Praesent feugiat sem vitae sagittis pharetra. Morbi non nisl lectus. Pellentesque in dolor quis nunc porta
          efficitur. Donec tincidunt lobortis malesuada. Nullam pretium orci non lorem mattis, nec ornare ligula
          venenatis.
        </p>

        <p>
          Phasellus ultricies erat a nisl blandit commodo. Vivamus quis mi laoreet, scelerisque eros et, commodo augue.
          Proin tristique malesuada diam non scelerisque. Integer sodales at dolor mollis lobortis. Sed at velit nec
          massa maximus viverra in nec lacus. Fusce interdum quam ut porta maximus. Maecenas a turpis rhoncus, convallis
          odio at, lacinia enim. Duis varius, dolor eu accumsan sagittis, augue libero ultricies quam, non pellentesque
          urna ligula nec orci. Nam sed porttitor dolor. Sed hendrerit, leo sit amet ultricies volutpat, felis erat
          volutpat libero, sit amet suscipit augue tortor at justo. In consectetur, mi ac posuere dictum, erat ligula
          lacinia augue, sit amet sollicitudin felis sem eu metus. Nunc pretium eros ut enim finibus congue. Phasellus
          eu mauris quis ex interdum pretium. Praesent ultricies tempus sapien, ut efficitur metus luctus ut. Sed non
          purus gravida, ultrices magna vel, efficitur lectus. Aenean non nisi sed turpis suscipit rhoncus in ut lorem.
        </p>

        <klevu-init
          .settings=${{
            icons: {
              thumb_up: "https://resources-webcomponents.klevu.com/pqa/thumbs-up.svg",
              thumb_down: "https://resources-webcomponents.klevu.com/pqa/thumbs-down.svg",
            },
          }}
          api-key="klevu-164677714116414855"
        >
          ${chatRender(args)}
        </klevu-init>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sapien et gravida faucibus, eros erat
          maximus metus, nec maximus felis magna sed sem. Aliquam sodales nibh ex, imperdiet euismod velit egestas quis.
          Nulla at orci vel ipsum luctus tempus non efficitur turpis. Donec malesuada nisl non fermentum faucibus. Proin
          cursus, nisi sit amet auctor scelerisque, est erat pellentesque neque, sit amet blandit lacus enim vitae urna.
          Praesent feugiat sem vitae sagittis pharetra. Morbi non nisl lectus. Pellentesque in dolor quis nunc porta
          efficitur. Donec tincidunt lobortis malesuada. Nullam pretium orci non lorem mattis, nec ornare ligula
          venenatis.
        </p>

        <p>
          Phasellus ultricies erat a nisl blandit commodo. Vivamus quis mi laoreet, scelerisque eros et, commodo augue.
          Proin tristique malesuada diam non scelerisque. Integer sodales at dolor mollis lobortis. Sed at velit nec
          massa maximus viverra in nec lacus. Fusce interdum quam ut porta maximus. Maecenas a turpis rhoncus, convallis
          odio at, lacinia enim. Duis varius, dolor eu accumsan sagittis, augue libero ultricies quam, non pellentesque
          urna ligula nec orci. Nam sed porttitor dolor. Sed hendrerit, leo sit amet ultricies volutpat, felis erat
          volutpat libero, sit amet suscipit augue tortor at justo. In consectetur, mi ac posuere dictum, erat ligula
          lacinia augue, sit amet sollicitudin felis sem eu metus. Nunc pretium eros ut enim finibus congue. Phasellus
          eu mauris quis ex interdum pretium. Praesent ultricies tempus sapien, ut efficitur metus luctus ut. Sed non
          purus gravida, ultrices magna vel, efficitur lectus. Aenean non nisi sed turpis suscipit rhoncus in ut lorem.
        </p>
      </div>
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
    pqaWidgetId: "pqa-5964f0f4-3277-4728-92e5-872eb0b49494",
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
      >${chatRender(args)}</klevu-init
    >`,
}
